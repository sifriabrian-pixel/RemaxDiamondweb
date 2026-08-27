import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/StatsStrip";
import { TeamSection } from "@/components/TeamSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <StatsStrip />
        <TeamSection />
      </main>
      <SiteFooter />
    </>
  );
}
