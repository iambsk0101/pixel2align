import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Skills } from "@/components/sections/Skills";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pixel2Align — Premium Web & UI Design that Converts" },
      {
        name: "description",
        content:
          "Pixel2Align is a Web & UI Design studio crafting premium, conversion-focused websites for hospitality, ecommerce and high-growth brands.",
      },
      { property: "og:title", content: "Pixel2Align — Premium Web & UI Design" },
      {
        property: "og:description",
        content:
          "Conversion-focused websites and brand experiences. 6+ years designing for luxury hospitality, ecommerce and SaaS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Work />
      <Skills />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
      <Toaster position="bottom-right" />
    </main>
  );
}
