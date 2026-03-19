import redis from "./redis";

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export async function rateLimit(
  identifier: string,
  limit: number = 10,
  windowSeconds: number = 60
): Promise<RateLimitResult> {
  if (!redis) {
    return { success: true, limit, remaining: limit, reset: 0 };
  }

  const key = `rate_limit:${identifier}`;
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - windowSeconds;

  const transaction = redis.multi();
  transaction.zremrangebyscore(key, 0, windowStart);
  transaction.zadd(key, now, `${now}_${Math.random()}`);
  transaction.zcard(key);
  transaction.expire(key, windowSeconds);

  const results = await transaction.exec();
  if (!results) return { success: true, limit, remaining: limit, reset: 0 };

  const count = results[2][1] as number;
  const success = count <= limit;

  return {
    success,
    limit,
    remaining: Math.max(0, limit - count),
    reset: now + windowSeconds,
  };
}
