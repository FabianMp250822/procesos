import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { db } from "@/db/db.server";
import { users } from "@/db/schema";
import { eq, or } from "drizzle-orm";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) return null;

        const usernameInput = credentials.username as string;
        const passwordInput = credentials.password as string;

        console.log(`[AUTH_DEBUG] Intentando login para usuario: "${usernameInput}"`);

        try {
          // Try exact match and uppercase match to be safe
          const uppercaseUsername = usernameInput.toUpperCase();
          const [user] = await db
            .select()
            .from(users)
            .where(
              or(
                eq(users.id, uppercaseUsername),
                eq(users.id, usernameInput)
              )
            );

          if (!user) {
            console.warn(`[AUTH_DEBUG] Usuario no encontrado en DB: "${usernameInput}" ni "${uppercaseUsername}"`);
            return null;
          }

          console.log(`[AUTH_DEBUG] Usuario encontrado: "${user.id}". Comparando contraseñas...`);

          // Legacy MySQL comparisons are usually case-insensitive for VARCHAR.
          // We match that behavior here to ensure 'admin' works for 'ADMIN'.
          if (user.password.toUpperCase() === passwordInput.toUpperCase()) {
            console.log(`[AUTH_DEBUG] Login exitoso para: "${user.id}"`);
            return {
              id: user.id,
              name: user.id,
              role: user.level,
            };
          } else {
            console.warn(`[AUTH_DEBUG] Contraseña incorrecta para: "${user.id}". DB: "${user.password}", Input: "${passwordInput}"`);
          }
        } catch (dbError) {
          console.error("[AUTH_DEBUG] Error de conexión o consulta en DB:", dbError);
          throw new Error("Error de conexión con la base de datos");
        }
        
        return null;
      },
    }),
  ],
});
