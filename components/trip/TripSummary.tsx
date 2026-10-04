import type { Trip, TripRequest } from "@/types/trip";
import { TRAVEL_STYLE_LABELS, BUDGET_LABELS } from "@/lib/labels";

interface TripSummaryProps {
  request: TripRequest;
  trip: Trip;
}

export function TripSummary({ request, trip }: TripSummaryProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 text-2xl font-semibold text-foreground">行程概览</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">目的地</p>
            <p className="text-base font-medium text-foreground">{trip.destination}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">行程时长</p>
            <p className="text-base font-medium text-foreground">{trip.duration} 天</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">出行人数</p>
            <p className="text-base font-medium text-foreground">{trip.travelers} 人</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">旅行风格</p>
            <p className="text-base font-medium text-foreground">
              {TRAVEL_STYLE_LABELS[request.travelStyle]}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">预算水平</p>
            <p className="text-base font-medium text-foreground">
              {BUDGET_LABELS[request.budget]}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">兴趣偏好</p>
            <p className="text-base font-medium text-foreground">
              {request.interests.join("、")}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-sm text-muted-foreground">行程简介</p>
          <p className="mt-2 text-base text-foreground">{trip.summary}</p>
        </div>
      </div>
    </section>
  );
}
