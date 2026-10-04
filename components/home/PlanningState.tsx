"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const STAGES = [
  "正在了解你的旅行偏好...",
  "正在寻找适合你的体验...",
  "正在组织每日行程...",
  "正在生成你的旅行计划...",
];

export function PlanningState() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="max-w-md space-y-8 px-6 text-center">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary">
              <Loader2 className="h-10 w-10 animate-spin text-primary-foreground" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {STAGES.map((text, index) => (
            <div
              key={text}
              className={`transition-all duration-500 ${
                index <= stage
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
            >
              <p
                className={`text-base ${
                  index === stage
                    ? "font-medium text-foreground"
                    : index < stage
                      ? "text-muted-foreground"
                      : "text-muted-foreground/50"
                }`}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
