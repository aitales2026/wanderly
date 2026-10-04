"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
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
      <section className="mx-auto max-w-4xl px-4 pb-16 pt-4 text-center">
        <p className="mb-4 text-muted-foreground">行程到这里就结束啦，下一站想去哪？</p>
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          再规划一场旅行 <ArrowRight className="size-4" />
        </Link>
      </section>
    </div>
  );
}
