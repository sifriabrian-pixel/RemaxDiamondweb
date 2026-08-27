import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/StatsStrip";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { AboutSection } from "@/components/AboutSection";
import { TeamSection } from "@/components/TeamSection";
import { ZoneSection } from "@/components/ZoneSection";
import { LeadForms } from "@/components/LeadForms";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsStrip />
      <FeaturedProperties />
      <AboutSection />
      <TeamSection />
      <ZoneSection />
      <LeadForms />
    </main>
  );
}
