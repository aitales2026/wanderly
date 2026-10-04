# Wanderly --- DESIGN.md

> AI-powered personalized travel itinerary planner for popular Chinese
> destinations.
>
> Brand: **Wanderly**
>
> Tagline: **Plan less. Travel more.**
>
> Product language: Simplified Chinese
>
> Visual direction: **Editorial Travel Magazine + Modern AI Product**

------------------------------------------------------------------------

## 1. Product Positioning

Wanderly helps users quickly create a personalized travel itinerary for
popular Chinese cities.

Core flow:

1.  User selects a destination.
2.  User specifies duration, travelers, interests, travel style, and
    budget.
3.  AI generates a structured itinerary.
4.  Wanderly renders the itinerary as a polished travel experience.
5.  User can optionally ask AI to modify the itinerary.

### V1 Supported destinations

-   北京
-   上海
-   成都
-   重庆
-   西安
-   杭州
-   广州
-   厦门

### V1 scope

Must have:

-   Home page
-   Trip planner form
-   AI itinerary generation
-   Structured JSON output
-   Trip result page
-   Destination/activity imagery
-   Loading state
-   Error state
-   Responsive layout
-   GitHub-ready README
-   Vercel deployment readiness

Nice to have:

-   AI itinerary modification
-   LocalStorage trip persistence
-   Subtle animations

Do not build in V1:

-   Authentication
-   Database
-   Maps
-   Flights
-   Hotels
-   Payments
-   RAG
-   Agent orchestration
-   MCP
-   Multi-model routing
-   Admin system
-   Social features

------------------------------------------------------------------------

## 2. Design Principles

### 2.1 Warm

Avoid cold SaaS dashboards.

Use warm off-white backgrounds, natural photography, soft borders, and
restrained shadows.

### 2.2 Editorial

The homepage and trip result page should feel closer to a premium travel
magazine than an enterprise dashboard.

Use:

-   Large typography
-   Large photography
-   Strong visual hierarchy
-   Generous whitespace
-   Asymmetric composition where appropriate

### 2.3 Cinematic

Photography is a major visual element.

Images should feel:

-   Natural
-   Travel-oriented
-   Atmospheric
-   Warm
-   Human
-   Editorial

Avoid generic corporate stock photography.

### 2.4 Spacious

Do not fill every area with cards.

Whitespace is part of the design.

### 2.5 AI-native

AI interactions should feel calm and intentional rather than technical.

Avoid:

-   Excessive robot imagery
-   Generic neon AI effects
-   Overuse of gradients
-   Constant spinning loaders

Use subtle sparkle, fade, breathing, and progressive status messages.

### 2.6 Premium but approachable

Wanderly should look polished but not luxurious to the point of being
inaccessible.

------------------------------------------------------------------------

## 3. Visual Identity

### Colors

  Token            Value       Usage
  ---------------- ----------- ---------------------------------------
  Background       `#F7F5F0`   Main page background
  Surface          `#FFFFFF`   Cards and panels
  Primary          `#173B35`   Main buttons, headings, active states
  Primary Hover    `#0F2D28`   Button hover
  Text             `#1C2421`   Main text
  Text Secondary   `#6B756F`   Supporting text
  Text Muted       `#9CA39F`   Placeholder / metadata
  Accent           `#E9825B`   Small highlights and travel accents
  AI Background    `#F1EBDD`   AI assistant areas
  Border           `#E7E3DB`   Borders and dividers
  Success          `#557A61`   Success state
  Error            `#B85C5C`   Error state

Do not introduce many additional colors.

------------------------------------------------------------------------

## 4. Typography

Primary font:

-   Geist for Latin characters and numbers
-   Noto Sans SC for Chinese

Typography scale:

  Element               Desktop   Weight   Line height
  ------------------- --------- -------- -------------
  Hero title               64px      600          1.05
  Hero title mobile        40px      600          1.08
  Page title               40px      600           1.1
  Section title            28px      600           1.2
  Card title               20px      600           1.3
  Body                     16px      400           1.6
  Small                    14px      400           1.5

Use negative letter spacing for large English headings when appropriate.

Chinese headings should remain readable and should not use excessive
negative tracking.

------------------------------------------------------------------------

## 5. Layout

Maximum viewport content width:

-   Global max width: `1440px`
-   Main content max width: `1200px`

Horizontal padding:

-   Large desktop: `48px`
-   Desktop: `32px`
-   Mobile: `20px`

General spacing should follow a consistent 4px/8px rhythm.

Avoid overly dense layouts.

------------------------------------------------------------------------

## 6. Border Radius

Use a small set of radius values:

-   Small controls: `12px`
-   Inputs / buttons: `14px`--`16px`
-   Cards: `20px`
-   Large planner / panels: `24px`
-   Pills / chips: `999px`

Avoid mixing many arbitrary radius values.

------------------------------------------------------------------------

## 7. Shadows

Use shadows sparingly.

Preferred approach:

-   subtle shadow for floating planner card
-   subtle shadow for elevated AI assistant
-   no heavy shadows on normal content cards

Borders are preferred over shadows for most cards.

------------------------------------------------------------------------

# 8. Page 1 --- Home

## 8.1 Navigation

Height:

-   approximately `72px`

Layout:

``` text
Wanderly                                      我的行程
```

Rules:

-   Logo/name on the left
-   Optional "我的行程" on the right if LocalStorage trips are
    implemented
-   Keep navigation visually quiet
-   No oversized navigation menu

------------------------------------------------------------------------

## 8.2 Hero

Hero should be the strongest visual area on the homepage.

Recommended structure:

``` text
┌──────────────────────────────────────────────────────────┐
│ Wanderly                                  我的行程       │
│                                                          │
│             Plan less.                                  │
│             Travel more.                                │
│                                                          │
│       AI 帮你规划下一场中国旅行                          │
│                                                          │
│       ┌────────────────────────────────────────────┐     │
│       │ 你想去哪里？                               │     │
│       │                                            │     │
│       │ 北京 上海 成都 重庆 西安 杭州 广州 厦门    │     │
│       │                                            │     │
│       │ 3 天        2 位旅行者                     │     │
│       │                                            │     │
│       │ 美食  人文  自然  夜生活  购物  休闲       │     │
│       │                                            │     │
│       │ 旅行风格：轻松 / 均衡 / 特种兵              │     │
│       │ 预算：经济 / 舒适 / 高端                    │     │
│       │                                            │     │
│       │              开始规划 →                    │     │
│       └────────────────────────────────────────────┘     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

Hero image:

-   Use a cinematic Chinese travel image.
-   Prefer city atmosphere over landmark-only photography.
-   Add a subtle gradient overlay when text overlays the image.
-   Ensure text contrast is always sufficient.

Hero minimum height:

-   Desktop: approximately `720px`
-   Mobile: auto height with sufficient vertical spacing

------------------------------------------------------------------------

## 8.3 Trip Planner Card

Planner card:

-   Width around `680px`--`720px`
-   White surface
-   `24px` radius
-   `24px` padding
-   Soft shadow
-   Responsive on mobile

Inputs:

### Destination

Supported destinations should be visually prominent.

### Duration

Use compact controls or a select.

Default:

-   3 days

### Travelers

Default:

-   2 travelers

### Interests

Suggested interests:

-   美食
-   人文
-   自然
-   夜生活
-   购物
-   咖啡
-   亲子
-   摄影

Use pill chips.

### Travel style

-   轻松
-   均衡
-   特种兵

Default:

-   均衡

### Budget

-   经济
-   舒适
-   高端

Default:

-   舒适

### CTA

Text:

**开始规划 →**

Button:

-   Height: `56px`
-   Radius: `14px`
-   Primary deep green
-   White text

------------------------------------------------------------------------

# 9. Popular Destinations

Below the hero.

Title:

**热门目的地**

Supporting copy:

**从熟悉的城市开始，交给 AI 规划一场刚刚好的旅行。**

Use large image cards.

Suggested desktop layout:

``` text
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│              │ │              │ │              │ │              │
│    北京      │ │    上海      │ │    成都      │ │    重庆      │
│              │ │              │ │              │ │              │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

Second row:

-   西安
-   杭州
-   广州
-   厦门

Image ratio:

-   Approximately 4:5

Card:

-   Radius `20px`
-   Overflow hidden
-   Image hover scale around `1.03`
-   Transition around `300ms`

Text should sit on a subtle bottom gradient when overlaid on the image.

------------------------------------------------------------------------

# 10. Page 2 --- Planning State

This page/state should not look like a technical loading screen.

Preferred visual:

``` text
Large travel image

        ✦

正在为你规划旅行...

了解你的旅行偏好
        ↓
寻找合适的体验
        ↓
组织每日行程
        ↓
生成旅行计划
```

Use subtle fade/breathing animations.

Avoid a generic circular spinner as the main visual.

Possible messages:

-   正在了解你的旅行偏好...
-   正在寻找适合你的体验...
-   正在组织每日行程...
-   正在生成你的旅行计划...

The exact messages may be animated or streamed.

------------------------------------------------------------------------

# 11. Page 3 --- Trip Result

This is the most important page.

## 11.1 Trip Hero

Approximate height:

-   `400px`--`420px`

Structure:

``` text
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  成都                                                    │
│  3天 · 2人 · 舒适                                        │
│                                                          │
│  一场关于美食、街巷与慢生活的成都之旅                    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

Use a large city image with dark gradient overlay.

------------------------------------------------------------------------

## 11.2 Trip Summary

Below hero:

-   destination
-   duration
-   travelers
-   travel style
-   budget
-   interests

Keep this concise.

Example:

``` text
成都
3 天
2 位旅行者
舒适
美食 · 人文 · 夜生活
```

------------------------------------------------------------------------

# 12. Day Navigation

Use a sticky horizontal navigation.

Example:

``` text
Day 1    Day 2    Day 3
```

Active state:

-   Deep green background
-   White text

Inactive:

-   Warm neutral background
-   Dark text

On mobile:

-   Horizontal scrolling
-   Keep it compact

------------------------------------------------------------------------

# 13. Day Section

Example:

``` text
Day 1

慢下来，先认识这座城市

上午
│
● 09:00
│
│ 宽窄巷子
│ 人文 · 城市漫游
│
● 12:30
│
│ 成都午餐
│ 美食
│
● 15:00
│
│ 人民公园
│ 休闲
```

Timeline:

-   Light neutral vertical line
-   Primary-colored nodes
-   Plenty of whitespace

Do not make the timeline visually heavy.

------------------------------------------------------------------------

# 14. Activity Card

Desktop:

``` text
┌─────────────────────────────────────────────────────┐
│                                                     │
│  [ image ]    09:00                                 │
│               宽窄巷子                               │
│               成都 · 人文                            │
│                                                     │
│               体验成都老城的街巷生活...              │
│                                                     │
│               约 2 小时                              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

Image:

-   Around `220px` wide
-   Ratio around `4:3`
-   Radius `16px`

Mobile:

``` text
┌─────────────────────┐
│                     │
│       image         │
│                     │
├─────────────────────┤
│ 09:00               │
│ 宽窄巷子              │
│ 成都 · 人文           │
│                     │
│ 体验成都老城...       │
└─────────────────────┘
```

------------------------------------------------------------------------

# 15. Activity Categories

V1 categories:

-   food
-   culture
-   nature
-   nightlife
-   shopping
-   relaxation
-   coffee
-   family

AI should return semantic category information.

AI should NOT return image URLs.

Frontend maps categories to local image assets.

Example:

``` ts
const activityImages = {
  food: "/images/activities/food.jpg",
  culture: "/images/activities/culture.jpg",
  nature: "/images/activities/nature.jpg",
  nightlife: "/images/activities/nightlife.jpg",
  shopping: "/images/activities/shopping.jpg",
  relaxation: "/images/activities/relaxation.jpg",
  coffee: "/images/activities/coffee.jpg",
  family: "/images/activities/family.jpg",
}
```

------------------------------------------------------------------------

# 16. Travel Tips

At the bottom of the itinerary:

``` text
旅行小贴士

• 建议提前查看热门景点预约情况
• 周末热门区域人流较多
• 根据天气调整户外活动
```

Use a warm neutral panel.

Include disclaimer:

> AI
> 生成的旅行计划仅供参考。出行前请确认景点开放时间、预约情况、交通及当地实时信息。

------------------------------------------------------------------------

# 17. AI Assistant

The AI assistant is an optional V1/P1 feature.

Collapsed:

``` text
✨ Ask AI
```

or Chinese:

``` text
✨ 问问 AI
```

Use a floating pill/button at bottom-right.

Expanded:

``` text
┌──────────────────────────────┐
│ ✨ AI 行程助手                │
├──────────────────────────────┤
│                              │
│ 想怎么调整这趟旅行？          │
│                              │
│ “把第二天安排得轻松一点”      │
│                              │
│ “多安排一些美食”              │
│                              │
│ “减少景点，增加咖啡馆”        │
│                              │
│ [ 输入你的想法...       → ]   │
└──────────────────────────────┘
```

AI assistant background:

-   `#F1EBDD`

Radius:

-   `24px`

Avoid chatbot-heavy visual language.

It should feel like a travel concierge.

------------------------------------------------------------------------

# 18. Components

Suggested component structure:

``` text
components/
├── home/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── TripForm.tsx
│   └── DestinationGrid.tsx
│
├── trip/
│   ├── TripHero.tsx
│   ├── TripSummary.tsx
│   ├── DayNavigation.tsx
│   ├── DaySection.tsx
│   ├── ActivityCard.tsx
│   ├── TravelTips.tsx
│   └── TripAssistant.tsx
│
└── ui/
    └── ...
```

Components should be reusable and reasonably small.

Avoid creating a component for every tiny `<div>`.

------------------------------------------------------------------------

# 19. Animation

Use animation sparingly.

Timing:

-   Micro interaction: `150ms`
-   Standard transition: `200ms`
-   Card hover: `300ms`
-   Page entrance: `400ms`

Good uses:

-   Image hover scale
-   Card fade-in
-   Section entrance
-   AI assistant open/close
-   Planning state breathing
-   Button hover

Avoid:

-   excessive parallax
-   constant bouncing
-   excessive spring animations
-   animation on every element

Respect `prefers-reduced-motion`.

------------------------------------------------------------------------

# 20. Responsive Design

Desktop-first visual design is acceptable, but mobile must be
functional.

Breakpoints should be based on layout needs rather than arbitrary device
names.

Mobile rules:

-   Hero title becomes around `40px`
-   Planner card becomes full width
-   Horizontal padding `20px`
-   Destination cards stack or become horizontally scrollable
-   Activity cards become vertical
-   Day navigation becomes horizontally scrollable
-   AI assistant becomes nearly full-width bottom sheet/panel
-   Avoid horizontal overflow

------------------------------------------------------------------------

# 21. Image Strategy

V1 should use curated static travel images.

Directory:

``` text
public/
└── images/
    ├── destinations/
    │   ├── beijing/
    │   │   ├── hero.jpg
    │   │   └── card.jpg
    │   ├── shanghai/
    │   ├── chengdu/
    │   ├── chongqing/
    │   ├── xian/
    │   ├── hangzhou/
    │   ├── guangzhou/
    │   └── xiamen/
    │
    └── activities/
        ├── food.jpg
        ├── culture.jpg
        ├── nature.jpg
        ├── nightlife.jpg
        ├── shopping.jpg
        ├── relaxation.jpg
        ├── coffee.jpg
        └── family.jpg
```

Do not make runtime image search a V1 dependency.

Do not let the AI model generate image URLs.

------------------------------------------------------------------------

# 22. Data and AI Boundary

AI is responsible for:

-   itinerary planning
-   activity selection
-   descriptions
-   ordering
-   travel tips
-   semantic activity category

Frontend/application is responsible for:

-   image selection
-   visual presentation
-   interaction
-   validation
-   local persistence
-   UI state

This separation reduces model hallucination and keeps presentation
deterministic.

------------------------------------------------------------------------

# 23. Accessibility

Minimum requirements:

-   semantic HTML
-   keyboard-accessible controls
-   visible focus states
-   sufficient text contrast
-   `alt` text for meaningful images
-   buttons must have clear labels
-   form fields must have labels
-   respect reduced-motion preference

Do not sacrifice accessibility for visual effects.

------------------------------------------------------------------------

# 24. UX States

Every important async action should have:

1.  idle
2.  loading
3.  success
4.  error

Generation error example:

``` text
暂时没能生成旅行计划

请稍后再试。

[重新规划 ]
```

Do not expose raw stack traces or provider errors to users.

------------------------------------------------------------------------

# 25. Engineering Constraints

Preferred stack:

-   Next.js
-   TypeScript
-   React
-   Tailwind CSS
-   shadcn/ui where useful
-   Lucide icons
-   AI SDK
-   Zod
-   Vercel
-   LocalStorage for simple persistence

Avoid adding dependencies unless they solve a clear problem.

Do not introduce:

-   Redux
-   complex state management
-   database
-   authentication
-   ORM
-   backend framework
-   unnecessary animation libraries

------------------------------------------------------------------------

# 26. AI Model Integration

Keep the AI provider behind a small abstraction.

Example conceptual structure:

``` text
lib/
├── ai.ts
├── schema.ts
└── trip-prompt.ts
```

Business code should not depend directly on provider-specific details.

The runtime model should be configurable through environment variables.

Example:

``` env
AI_MODEL=your-model-id
```

Do not hard-code API keys.

Do not expose server-side API keys to the browser.

------------------------------------------------------------------------

# 27. AI Output Schema

Conceptual model:

``` ts
type TripRequest = {
  destination: string
  duration: number
  travelers: number
  interests: string[]
  travelStyle: "relaxed" | "balanced" | "packed"
  budget: "budget" | "moderate" | "premium"
}

type Trip = {
  destination: string
  title: string
  summary: string
  duration: number
  travelers: number
  days: TripDay[]
  tips: string[]
}

type TripDay = {
  day: number
  title: string
  summary: string
  activities: Activity[]
}

type Activity = {
  time: string
  name: string
  description: string
  location: string
  duration: string
  category: string
}
```

Use Zod or equivalent structured output validation.

------------------------------------------------------------------------

# 28. Design Quality Checklist

Before considering a page finished:

### Visual

-   Does it look like a travel product rather than a generic SaaS
    dashboard?
-   Is photography prominent?
-   Is there enough whitespace?
-   Are typography and spacing consistent?
-   Are cards and buttons using the design tokens?
-   Are there too many borders/shadows?

### UX

-   Is the main CTA obvious?
-   Can a user understand what to do within 5 seconds?
-   Are loading and error states clear?
-   Does the itinerary remain readable on mobile?

### AI

-   Is AI interaction visible but not gimmicky?
-   Is generated content structured?
-   Are model/provider errors hidden from the user?
-   Is image selection deterministic?

### Engineering

-   Is the UI split into reusable components?
-   Are server secrets protected?
-   Is the AI output validated?
-   Does the app build successfully?
-   Does it work after a clean Vercel deployment?

------------------------------------------------------------------------

# 29. Product Personality

Wanderly should feel:

-   Calm
-   Curious
-   Warm
-   Intelligent
-   Helpful
-   Modern
-   Human

Wanderly should NOT feel:

-   Corporate
-   Technical
-   Cold
-   Overly futuristic
-   Neon cyberpunk
-   Generic AI chatbot
-   Enterprise dashboard

------------------------------------------------------------------------

# 30. Final Design Rule

When a design decision is ambiguous, prefer:

**less UI + more hierarchy + better photography + more whitespace**

over:

**more components + more decoration + more controls.**
