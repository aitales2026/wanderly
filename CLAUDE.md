# Wanderly --- Claude Code Project Instructions

## 1. Project Identity

You are working on **Wanderly**, an AI-powered personalized travel
itinerary planner.

Brand:

> Wanderly

Tagline:

> Plan less. Travel more.

Product language:

> Simplified Chinese

Target users:

> People planning trips to popular Chinese tourist cities.

Primary project goal:

> Build a polished, deployable AI Coding showcase in approximately 2--3
> days.

This is a portfolio/job-interview project, not a production-scale travel
platform.

------------------------------------------------------------------------

## 2. Source of Truth

Before making product or UI decisions, read:

``` text
DESIGN.md
```

`DESIGN.md` is the source of truth for:

-   product scope
-   visual direction
-   colors
-   typography
-   layout
-   responsive behavior
-   page structure
-   components
-   animation
-   image strategy
-   AI/frontend responsibility boundaries

Do not casually override `DESIGN.md`.

If implementation constraints require a deviation:

1.  explain the reason
2.  choose the smallest deviation
3.  keep the visual language consistent
4.  mention the deviation in the final summary

------------------------------------------------------------------------

## 3. Development Philosophy

Optimize for:

1.  working product
2.  clear architecture
3.  polished UI
4.  reliable AI output
5.  simple implementation
6.  fast iteration

Do NOT optimize for:

-   enterprise-level architecture
-   maximum abstraction
-   maximum number of features
-   unnecessary infrastructure
-   speculative future requirements

This is a small but polished MVP.

Prefer simple code that is easy to explain in an interview.

------------------------------------------------------------------------

## 4. Required Technology

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
-   LocalStorage for lightweight persistence

Use the existing project's package manager.

Do not introduce a new package manager.

------------------------------------------------------------------------

## 5. Explicitly Avoid

Do not add these unless the user explicitly requests them:

-   database
-   authentication
-   ORM
-   Redux
-   Zustand or other global state libraries
-   backend framework
-   Go backend
-   Python backend
-   microservices
-   Docker
-   Redis
-   Kafka
-   RabbitMQ
-   maps integration
-   hotel API
-   flight API
-   payment system
-   RAG
-   vector database
-   MCP
-   agent orchestration
-   multi-model routing
-   admin system
-   social features

The application should remain a Next.js full-stack application for V1.

------------------------------------------------------------------------

## 6. Product Scope

### Supported destinations

V1 should focus on:

-   北京
-   上海
-   成都
-   重庆
-   西安
-   杭州
-   广州
-   厦门

Do not expand the destination list unnecessarily.

### Trip request

Conceptually:

``` ts
type TripRequest = {
  destination: string
  duration: number
  travelers: number
  interests: string[]
  travelStyle: "relaxed" | "balanced" | "packed"
  budget: "budget" | "moderate" | "premium"
}
```

### Trip output

Conceptually:

``` ts
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

The actual implementation may improve these types when necessary.

------------------------------------------------------------------------

## 7. AI Responsibility

AI is responsible for:

-   generating itinerary structure
-   selecting activities
-   writing activity descriptions
-   organizing activities into days
-   generating trip summaries
-   generating travel tips
-   returning semantic activity categories

AI is NOT responsible for:

-   UI HTML
-   CSS
-   image URLs
-   image filenames
-   frontend component selection
-   browser-side secrets
-   third-party resource URLs

The AI output must be structured and validated.

Use Zod for validation.

------------------------------------------------------------------------

## 8. Image Responsibility

Images are controlled by the application.

AI should return semantic categories such as:

``` text
food
culture
nature
nightlife
shopping
relaxation
coffee
family
```

The frontend maps those categories to local image assets.

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

Always provide a fallback image.

Never trust an AI-generated image URL.

------------------------------------------------------------------------

## 9. AI Provider Architecture

Keep the AI provider behind a small abstraction.

Preferred conceptual structure:

``` text
lib/
├── ai.ts
├── schema.ts
└── trip-prompt.ts
```

Application code should not scatter provider-specific API calls
throughout components.

The model should be configurable.

Example:

``` env
AI_MODEL=your-model-id
```

Never hard-code API keys.

Never expose server-side API keys to client components.

Do not commit `.env` files containing secrets.

------------------------------------------------------------------------

## 10. Volcengine / Coding Plan

The current development environment uses Volcengine Coding Plan.

The known Coding Plan endpoints provided by the user are:

``` text
Anthropic-compatible:
https://ark.cn-beijing.volces.com/api/coding

OpenAI-compatible:
https://ark.cn-beijing.volces.com/api/coding/v3
```

Do not assume that a Coding Plan endpoint should automatically be used
as the production runtime API endpoint.

When implementing runtime AI calls:

1.  inspect the current project configuration
2.  use the provider/API mechanism actually available to the application
3.  keep provider-specific details isolated
4.  never expose credentials to the browser

If provider details are unclear, stop and ask the user rather than
inventing an endpoint or SDK configuration.

------------------------------------------------------------------------

## 11. Plan Mode Policy

For any task that:

-   changes multiple files
-   changes architecture
-   adds a new feature
-   changes AI integration
-   changes the data model
-   changes the main UI structure
-   introduces a dependency

prefer **Plan Mode first**.

Do not immediately start modifying many files.

In Plan Mode:

1.  inspect the repository
2.  inspect relevant existing code
3.  read DESIGN.md
4.  identify dependencies
5.  propose implementation steps
6.  identify risks
7.  identify files to change

For small isolated fixes, direct implementation is acceptable.

------------------------------------------------------------------------

## 12. Implementation Workflow

Use this general order:

### Phase 1 --- Foundation

-   project structure
-   Tailwind/design tokens
-   fonts
-   base layout
-   navigation
-   shared UI primitives

### Phase 2 --- Home

-   Hero
-   TripForm
-   destination selector
-   duration
-   travelers
-   interests
-   travel style
-   budget
-   CTA
-   destination cards

### Phase 3 --- AI Generation

Implement:

``` text
POST /api/generate-trip
```

Flow:

``` text
request
  ↓
input validation
  ↓
AI prompt
  ↓
structured output
  ↓
Zod validation
  ↓
Trip JSON
  ↓
response
```

### Phase 4 --- Trip Result

Implement:

-   TripHero
-   TripSummary
-   DayNavigation
-   DaySection
-   ActivityCard
-   TravelTips

### Phase 5 --- Loading and Error

Implement polished:

-   loading state
-   generation progress state
-   error state
-   retry

### Phase 6 --- AI Modification

Only after P0 is stable.

Implement:

``` text
POST /api/modify-trip
```

Keep this simple.

Do not build a complex chatbot framework.

### Phase 7 --- LocalStorage

Only if time permits.

### Phase 8 --- Polish

Focus on:

-   typography
-   spacing
-   image crop
-   responsive layout
-   accessibility
-   subtle animations
-   empty/error states

------------------------------------------------------------------------

## 13. UI Rules

The product should feel like:

> Editorial Travel Magazine + Modern AI Product

It should NOT feel like:

-   generic SaaS dashboard
-   enterprise admin panel
-   generic chatbot
-   futuristic neon AI product
-   technical demo

Follow `DESIGN.md` for exact visual rules.

When uncertain, prefer:

> less UI + more hierarchy + better photography + more whitespace

over:

> more components + more decoration + more controls

------------------------------------------------------------------------

## 14. Component Rules

Prefer reusable components with clear responsibilities.

Good:

``` text
TripForm
ActivityCard
DaySection
TripHero
TripAssistant
```

Avoid creating components for every tiny DOM fragment.

Do not over-abstract early.

Do not create a generic design system for components that are only used
once.

Use shadcn/ui selectively.

------------------------------------------------------------------------

## 15. Server / Client Boundaries

Default to Server Components in Next.js.

Use `"use client"` only when client-side behavior is required, such as:

-   form interaction
-   browser APIs
-   LocalStorage
-   interactive tabs
-   AI assistant interaction
-   animations requiring client state

Do not turn entire pages into Client Components unnecessarily.

Keep secrets and provider calls on the server.

------------------------------------------------------------------------

## 16. Validation

Validate user input.

Validate AI output.

Never assume AI output is correct.

If structured output fails:

1.  handle the error
2.  show a user-friendly message
3.  do not expose raw provider errors

Example:

``` text
暂时没能生成旅行计划

请稍后再试。

[重新规划]
```

------------------------------------------------------------------------

## 17. Error Handling

Never show:

-   API keys
-   provider credentials
-   stack traces
-   raw provider error objects
-   internal file paths

to users.

Log useful diagnostic information server-side when appropriate.

Client-facing errors should be concise and actionable.

------------------------------------------------------------------------

## 18. Async UI

Every important async operation should have:

``` text
idle
loading
success
error
```

AI generation should use a travel-oriented loading experience.

Prefer:

``` text
正在了解你的旅行偏好...
正在寻找适合你的体验...
正在组织每日行程...
正在生成你的旅行计划...
```

over a generic full-screen spinner.

------------------------------------------------------------------------

## 19. Responsive Requirements

The application must work on:

-   desktop
-   tablet
-   mobile

Always check:

-   horizontal overflow
-   text wrapping
-   image crop
-   planner form layout
-   day navigation
-   activity cards
-   AI assistant

Mobile is not an optional enhancement.

------------------------------------------------------------------------

## 20. Accessibility

At minimum:

-   semantic HTML
-   accessible labels
-   keyboard navigation
-   visible focus states
-   meaningful image alt text
-   sufficient contrast
-   reduced-motion support

Do not sacrifice basic accessibility for visual effects.

------------------------------------------------------------------------

## 21. Dependencies

Before installing a package, ask:

> Does this package solve a real problem that cannot reasonably be
> solved with the current stack?

If not, do not install it.

Avoid dependency sprawl.

Prefer built-in Next.js, React, browser APIs, Tailwind, and existing
utilities.

------------------------------------------------------------------------

## 22. Code Style

Use TypeScript strictly.

Avoid:

``` ts
any
```

unless there is a documented reason.

Prefer:

-   explicit types
-   small functions
-   predictable data flow
-   readable names
-   early validation
-   simple control flow

Do not prematurely optimize.

Do not create unnecessary abstractions.

------------------------------------------------------------------------

## 23. File Organization

Preferred structure:

``` text
wanderly/
├── CLAUDE.md
├── DESIGN.md
├── README.md
├── app/
│   ├── page.tsx
│   ├── trip/
│   │   └── page.tsx
│   └── api/
│       ├── generate-trip/
│       │   └── route.ts
│       └── modify-trip/
│           └── route.ts
├── components/
│   ├── home/
│   ├── trip/
│   └── ui/
├── lib/
│   ├── ai.ts
│   ├── schema.ts
│   ├── trip-prompt.ts
│   └── storage.ts
├── types/
│   └── trip.ts
├── data/
│   └── destinations.ts
├── public/
│   └── images/
└── package.json
```

The structure may be adjusted when the existing Next.js version or
project conventions require it.

------------------------------------------------------------------------

## 24. Testing and Verification

After meaningful changes, run the project's available checks.

At minimum, before declaring the project complete:

``` bash
npm run lint
npm run build
```

Use the actual package manager if the project uses pnpm/yarn/bun.

Also verify:

-   TypeScript compilation
-   API route behavior
-   AI output validation
-   no secret exposure
-   responsive layout
-   image loading
-   browser console
-   error states

Do not claim a check passed unless you actually ran it.

------------------------------------------------------------------------

## 25. Git Discipline

Keep changes understandable.

Prefer small logical commits when the user asks for commits.

Suggested commit grouping:

``` text
feat: build wanderly home page
feat: add AI trip generation
feat: build trip result page
feat: add AI itinerary assistant
fix: improve trip generation error handling
style: polish responsive travel UI
```

Do not create commits automatically unless requested.

Do not rewrite git history unless explicitly requested.

------------------------------------------------------------------------

## 26. README / Interview Story

The project is intended to demonstrate AI Coding ability.

README should eventually explain:

-   product overview
-   live demo
-   tech stack
-   architecture
-   AI integration
-   structured output
-   AI Coding workflow
-   local development
-   environment variables
-   deployment
-   screenshots

The AI Coding process should be described honestly.

Do not claim work was done manually if it was AI-assisted.

Do not claim an AI tool performed work that it did not perform.

------------------------------------------------------------------------

## 27. How to Report Work

After implementation tasks, summarize:

### Changed

List important files and what changed.

### Why

Explain important technical decisions briefly.

### Validation

List commands actually executed and their results.

### Remaining

List unresolved issues, if any.

Do not provide vague statements such as:

> Everything should work.

Only report verified facts.

------------------------------------------------------------------------

## 28. When to Ask the User

Do not ask unnecessary questions.

Make reasonable assumptions when the decision is:

-   low risk
-   reversible
-   consistent with DESIGN.md
-   appropriate for a 2--3 day MVP

Ask the user when:

-   API/provider details are ambiguous
-   a decision affects architecture significantly
-   credentials or external services are required
-   the requested behavior conflicts with DESIGN.md
-   implementing the request would substantially expand scope

When asking, explain the concrete trade-off.

------------------------------------------------------------------------

## 29. Scope Control

Continuously protect the MVP.

If you notice an attractive feature such as:

-   weather
-   maps
-   hotel booking
-   flight search
-   route optimization
-   real-time POI data
-   login
-   sharing
-   social features

do not automatically implement it.

Instead, identify it as a possible future enhancement.

The current goal is:

> A polished AI itinerary generator that can be demonstrated in 5--10
> minutes.

------------------------------------------------------------------------

## 30. Final Product Standard

Before calling Wanderly complete, the following should be true:

-   user can select a Chinese destination
-   user can configure travel preferences
-   user can generate an itinerary through AI
-   AI output is structured and validated
-   generated itinerary is visually polished
-   activity images are deterministic
-   loading state feels intentional
-   errors are handled gracefully
-   mobile layout works
-   application builds successfully
-   deployment configuration is clear
-   README explains the project
-   GitHub repository is understandable
-   live Vercel demo is ready

The product should look like a small real product, not a collection of
AI-generated demo screens.
