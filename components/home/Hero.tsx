import Image from "next/image";
import { TripForm } from "./TripForm";

export function Hero() {
  return (
    <section className="relative flex min-h-[720px] items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/destinations/chongqing/hero.jpg"
        alt="重庆山城夜景"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-content px-5 py-24 text-center md:px-8 xl:px-12">
        <h1 className="mb-6 text-title font-semibold text-white md:text-hero">
          <span className="block">Plan less.</span>
          <span className="block">Travel more.</span>
        </h1>
        <p className="mb-12 text-body text-white/90">
          AI 帮你规划下一场中国旅行
        </p>

        {/* TripForm */}
        <div className="mx-auto max-w-[720px] rounded-2xl bg-card p-6 shadow-planner">
          <TripForm />
        </div>
      </div>
    </section>
  );
}
