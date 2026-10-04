import type { TripRequest } from "@/types/trip";
import {
  TRAVEL_STYLE_LABELS,
  BUDGET_LABELS,
  TRAVEL_STYLE_PROMPT_GUIDANCE,
  BUDGET_PROMPT_GUIDANCE,
} from "./labels";

export function buildSystemPrompt(): string {
  return `你是 Wanderly 的旅行规划师，一位熟悉中国城市深度游的专业旅行顾问。你为真实旅行者制定真实可行的行程。

输出规则：
1. 全部内容使用简体中文（category 字段除外，见下）。
2. category 只能是以下英文枚举之一：food, culture, nature, nightlife, shopping, relaxation, coffee, family。
3. 每个活动：time 用 24 小时制（"09:00"）；name 简洁（地点或体验名，≤15 字）；description 用 1–2 句有画面感的介绍（≤60 字），口吻像一个懂当地的朋友，具体、温暖、不套话；location 写清城区或地标（如"青羊区 · 宽窄巷子"）；duration 形如"约 2 小时"。
4. days 数组长度必须恰好等于旅行天数，day 字段从 1 开始连续递增。
5. 行程必须真实可行：只使用真实存在、可到达的地点；同一日的活动按地理位置就近安排，考虑用餐与交通时间，节奏符合用户选择的旅行风格。
6. 不要编造不存在的店铺或景点；优先经典、可靠、口碑稳定的选择。
7. 顶层字段：destination（目的地名称）、duration（天数，数字）、travelers（人数，数字）必须与用户输入一致；title 是整个行程的主题式标题（如"一场关于美食、街巷与慢生活的成都之旅"）；summary 用 1–2 句概括这次行程的亮点。
8. 每个 day 对象必须包含：day（第几天）、title（当日主题，如"初识蓉城，慢生活体验"）、summary（当日概述，1-2 句话）、activities（活动数组）。
9. tips 是 3–6 条实用贴士（预约、交通、天气、人流、当地习惯），每条不带序号。
10. 不要输出任何 URL、图片链接或本规则之外的字段。`;
}

export function buildTripPrompt(request: TripRequest): string {
  const styleLabel = TRAVEL_STYLE_LABELS[request.travelStyle];
  const styleGuidance = TRAVEL_STYLE_PROMPT_GUIDANCE[request.travelStyle];
  const budgetLabel = BUDGET_LABELS[request.budget];
  const budgetGuidance = BUDGET_PROMPT_GUIDANCE[request.budget];

  return `请为我规划一份旅行行程：

目的地：${request.destination}
天数：${request.duration} 天
人数：${request.travelers} 位旅行者
兴趣偏好：${request.interests.join("、")}
旅行风格：${styleLabel} —— ${styleGuidance}
预算：${budgetLabel} —— ${budgetGuidance}

补充要求：
- 依据兴趣偏好的优先级选择活动，同时保持行程丰富度
- days 数组必须恰好包含 ${request.duration} 个元素，day 依次为 1、2、...、${request.duration}
- 每天 activities 数量为 3–6 个，符合上述旅行风格
- 早餐/午餐/晚餐如涉及美食体验，安排在合理时段

请严格返回如下 JSON 结构（不要包含任何其他文字）：
{
  "destination": "${request.destination}",
  "duration": ${request.duration},
  "travelers": ${request.travelers},
  "title": "行程主题标题",
  "summary": "行程概述",
  "days": [
    {
      "day": 1,
      "title": "当日主题",
      "summary": "当日概述",
      "activities": [...]
    }
  ],
  "tips": ["贴士1", "贴士2", ...]
}`;
}
