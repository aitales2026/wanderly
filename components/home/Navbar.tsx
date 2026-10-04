import Link from "next/link";
import { Compass } from "lucide-react";

export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-8 xl:px-12">
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground transition-opacity hover:opacity-80"
        >
          <Compass className="size-5" aria-hidden />
          <span className="text-card font-semibold tracking-tight">
            Wanderly
          </span>
        </Link>
      </div>
    </header>
  );
}
