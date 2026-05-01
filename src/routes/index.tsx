import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { TitleBar } from "@/components/ide/TitleBar";
import { Sidebar } from "@/components/ide/Sidebar";
import { EditorTabs, Breadcrumb } from "@/components/ide/EditorTabs";
import { StatusBar } from "@/components/ide/StatusBar";
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
          "Pixel2Align is a premium Web & UI design studio. Editorial design, conversion strategy, and pixel-precise builds for brands that refuse to look ordinary.",
      },
      { property: "og:title", content: "Pixel2Align — Premium Web & UI Design" },
      {
        property: "og:description",
        content:
          "Conversion-focused websites and brand experiences. Hospitality, ecommerce, SaaS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [active, setActive] = useState("hero");

  const select = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <TitleBar />
      <div className="flex-1 flex min-h-0">
        <Sidebar active={active} onSelect={select} />
        <main className="flex-1 min-w-0 flex flex-col bg-editor">
          <EditorTabs active={active} onSelect={select} />
          <Breadcrumb active={active} />
          <div className="flex-1">
            <Hero />
            <Marquee />
            <About />
            <Work />
            <Skills />
            <Process />
            <Testimonials />
            <Contact />
            <Footer />
          </div>
        </main>
      </div>
      <StatusBar active={active} />
      <Toaster position="bottom-right" />
    </div>
  );
}
