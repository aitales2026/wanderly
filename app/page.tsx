import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { DestinationGrid } from "@/components/home/DestinationGrid";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <DestinationGrid />
    </main>
  );
}
