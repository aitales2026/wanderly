import { z } from "zod";

export const DESTINATION_NAMES = [
  "北京",
  "上海",
  "成都",
  "重庆",
  "西安",
  "杭州",
  "广州",
  "厦门",
] as const;

export const INTEREST_OPTIONS = [
  "美食",
  "人文",
  "自然",
  "夜生活",
  "购物",
  "咖啡",
  "亲子",
  "摄影",
] as const;

export const TRAVEL_STYLES = ["relaxed", "balanced", "packed"] as const;

export const BUDGET_LEVELS = ["budget", "moderate", "premium"] as const;

export const ACTIVITY_CATEGORIES = [
  "food",
  "culture",
  "nature",
  "nightlife",
  "shopping",
  "relaxation",
  "coffee",
  "family",
] as const;

export const tripRequestSchema = z.object({
  destination: z.enum(DESTINATION_NAMES),
  duration: z.number().int().min(1).max(7),
  travelers: z.number().int().min(1).max(10),
  interests: z.array(z.enum(INTEREST_OPTIONS)).min(1).max(5),
  travelStyle: z.enum(TRAVEL_STYLES),
  budget: z.enum(BUDGET_LEVELS),
});

export const activitySchema = z.object({
  time: z.string().regex(/^\d{2}:\d{2}$/),
  name: z.string().min(1).max(30),
  description: z.string().min(10).max(80),
  location: z.string().min(1).max(40),
  duration: z.string().min(1).max(20),
  category: z.enum(ACTIVITY_CATEGORIES),
});

export const tripDaySchema = z.object({
  day: z.number().int().min(1).max(7),
  title: z.string().min(1).max(20),
  summary: z.string().min(1).max(80),
  activities: z.array(activitySchema).min(3).max(6),
});

export const tripSchema = z
  .object({
    destination: z.string().min(1),
    title: z.string().min(1).max(30),
    summary: z.string().min(1).max(120),
    duration: z.number().int().min(1).max(7),
    travelers: z.number().int().min(1).max(10),
    days: z.array(tripDaySchema).min(1).max(7),
    tips: z.array(z.string().min(1).max(60)).min(3).max(6),
  })
  .refine((t) => t.days.length === t.duration, {
    message: "days 数组长度必须等于旅行天数",
  })
  .refine((t) => t.days.every((d, i) => d.day === i + 1), {
    message: "days 必须从 1 开始连续递增",
  });

export const modifyTripRequestSchema = z.object({
  trip: tripSchema,
  instruction: z.string().trim().min(1).max(200),
});
