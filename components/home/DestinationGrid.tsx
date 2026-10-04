import Image from "next/image";
import { destinations } from "@/data/destinations";
import Link from "next/link";

export function DestinationGrid() {
  return (
    <section className="mx-auto max-w-content px-5 py-20 md:px-8 xl:px-12">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-section font-semibold text-foreground">
          热门目的地
        </h2>
        <p className="text-body text-muted-foreground">
          从熟悉的城市开始，交给 AI 规划一场刚刚好的旅行。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map((dest) => (
          <Link
            key={dest.slug}
            href={`/?destination=${dest.name}`}
            className="group relative block overflow-hidden rounded-xl"
          >
            <div className="aspect-[4/5] relative">
              <Image
                src={dest.cardImage}
                alt={dest.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="text-card font-semibold text-white">
                {dest.name}
              </h3>
              <p className="mt-1 text-small text-white/80">{dest.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
