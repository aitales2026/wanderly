import type { TripDay } from "@/types/trip";
import { ActivityCard } from "./ActivityCard";

interface DaySectionProps {
  day: TripDay;
}

export function DaySection({ day }: DaySectionProps) {
  return (
    <section id={`day-${day.day}`} className="mb-12 scroll-mt-20">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground">第 {day.day} 天</h2>
        <p className="mt-2 text-lg text-muted-foreground">{day.title}</p>
      </div>

      <div className="space-y-6">
        {day.activities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </div>
    </section>
  );
}
