"use client";

import { useState, useEffect } from "react";
import type { TripDay } from "@/types/trip";

interface DayNavigationProps {
  days: TripDay[];
}

export function DayNavigation({ days }: DayNavigationProps) {
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const daySections = days.map((day) =>
        document.getElementById(`day-${day.day}`)
      );

      for (const section of daySections) {
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          const dayNum = parseInt(section.id.replace("day-", ""));
          setActiveDay(dayNum);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [days]);

  const scrollToDay = (day: number) => {
    const element = document.getElementById(`day-${day}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-4xl px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {days.map((day) => (
            <button
              key={day.day}
              onClick={() => scrollToDay(day.day)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeDay === day.day
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              第 {day.day} 天
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
