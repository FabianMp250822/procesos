import Redis from "ioredis";

const redisClientSingleton = () => {
  if (!process.env.REDIS_URL) {
    console.warn("REDIS_URL is not defined. Redis features will be disabled.");
    return null;
  }
  const client = new Redis(process.env.REDIS_URL);
  client.on("error", (err) => {
    console.warn("Redis Connection Error (Ignored for local dev):", err.message);
  });
  return client;
};

declare global {
  var redis: undefined | ReturnType<typeof redisClientSingleton>;
}

const redis = globalThis.redis ?? redisClientSingleton();

export default redis;

if (process.env.NODE_ENV !== "production") globalThis.redis = redis;

export async function getCache<T>(key: string): Promise<T | null> {
  if (!redis) return null;
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Redis getCache error for key ${key}:`, error);
    return null;
  }
}

export async function setCache(key: string, value: any, ttlSeconds: number = 3600) {
  if (!redis) return;
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
  } catch (error) {
    console.error(`Redis setCache error for key ${key}:`, error);
  }
}

export async function invalidateCache(key: string) {
  if (!redis) return;
  await redis.del(key);
}
