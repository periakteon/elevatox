import { env } from "@/env.mjs";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

export const rateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(10, "10 s"),
});
