import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Diagnostic and utility scripts
    "*.js",
    "*.mjs",
    "src/lib/inspect_*.ts",
    "src/lib/list_tables*.ts",
    "src/lib/check_schema.ts",
    "src/lib/search_doc_tables.ts",
    "src/lib/inspect_db_direct.ts",
    "src/lib/inspect_params.ts",
    "src/lib/inspect_doc_tables.ts",
    "src/lib/inspect_pensioner_tables.ts",
    "src/lib/inspect_table.ts",
    "src/app/test-db/page.tsx", // Temporary fix for connection test page
  ]),
]);

export default eslintConfig;
