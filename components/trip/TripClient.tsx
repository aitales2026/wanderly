"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadCurrentTrip } from "@/lib/storage";
import type { StoredTrip } from "@/types/trip";
import { TripHero } from "./TripHero";
import { TripSummary } from "./TripSummary";
import { DayNavigation } from "./DayNavigation";
import { DaySection } from "./DaySection";
import { TravelTips } from "./TravelTips";

export function TripClient() {
  const router = useRouter();
  const [data, setData] = useState<StoredTrip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = loadCurrentTrip();
    if (!stored) {
      router.replace("/");
      return;
    }
    setData(stored);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">加载中...</div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { request, trip } = data;

  return (
    <div className="min-h-screen bg-background">
      <TripHero trip={trip} />
      <TripSummary request={request} trip={trip} />
      <DayNavigation days={trip.days} />
      <div className="mx-auto max-w-4xl px-4 py-8">
        {trip.days.map((day) => (
          <DaySection key={day.day} day={day} />
        ))}
      </div>
      <TravelTips tips={trip.tips} />
    </div>
  );
}
