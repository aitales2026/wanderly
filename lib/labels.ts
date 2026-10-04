import type { TravelStyle, BudgetLevel } from "@/types/trip";

export const TRAVEL_STYLE_LABELS: Record<TravelStyle, string> = {
  relaxed: "轻松",
  balanced: "均衡",
  packed: "特种兵",
};

export const BUDGET_LABELS: Record<BudgetLevel, string> = {
  budget: "经济",
  moderate: "舒适",
  premium: "高端",
};

export const TRAVEL_STYLE_PROMPT_GUIDANCE: Record<TravelStyle, string> = {
  relaxed: "行程节奏放松：每天 3–4 个活动，安排午间休整或自由漫步时间",
  balanced: "行程节奏均衡：每天 4–5 个活动，张弛有度",
  packed: "行程充实高效：每天 5–6 个活动，充分利用时间，注意标注交通衔接",
};

export const BUDGET_PROMPT_GUIDANCE: Record<BudgetLevel, string> = {
  budget: "经济型：优先免费/低价景点、本地小吃、公共交通",
  moderate: "舒适型：中档餐厅与付费体验，偶尔值得的升级",
  premium: "高端型：精选餐厅、私享或小团体验、品质优先",
};
