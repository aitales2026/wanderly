import Image from "next/image";
import type { Activity } from "@/types/trip";
import { ACTIVITY_IMAGES } from "@/lib/images";

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const imageUrl = ACTIVITY_IMAGES[activity.category] || ACTIVITY_IMAGES.default;

  return (
    <div className="flex flex-col md:flex-row gap-6 rounded-xl border border-border bg-card p-4">
      <div className="relative h-48 md:h-32 md:w-48 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={activity.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 192px"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              {activity.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {activity.location}
            </p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {activity.time}
          </span>
        </div>

        <p className="mb-3 flex-1 text-sm text-foreground">{activity.description}</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>时长: {activity.duration}</span>
        </div>
      </div>
    </div>
  );
}
