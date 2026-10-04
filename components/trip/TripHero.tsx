import Image from "next/image";
import type { Trip } from "@/types/trip";
import { getDestinationByName } from "@/data/destinations";

interface TripHeroProps {
  trip: Trip;
}

export function TripHero({ trip }: TripHeroProps) {
  const destination = getDestinationByName(trip.destination);
  const heroImage = destination?.heroImage || "/images/destinations/chongqing/hero.jpg";

  return (
    <section className="relative h-[400px] w-full overflow-hidden">
      <Image
        src={heroImage}
        alt={trip.destination}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="mb-4 text-5xl font-bold md:text-6xl">{trip.destination}</h1>
        <p className="mb-6 text-xl md:text-2xl">{trip.title}</p>
        <div className="flex items-center gap-4 text-sm md:text-base">
          <span>{trip.duration} 天</span>
          <span>·</span>
          <span>{trip.travelers} 人</span>
        </div>
      </div>
    </section>
  );
}
