import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FeaturedPlants } from "@/components/home/FeaturedPlants";
import { AIHighlight } from "@/components/home/AIHighlight";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedPlants />
      <AIHighlight />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <Newsletter />
    </>
  );
}
