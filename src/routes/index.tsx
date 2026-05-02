import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { IdeProvider, useIde, FILES } from "@/components/ide/IdeContext";
import { TitleBar } from "@/components/ide/TitleBar";
import { Sidebar } from "@/components/ide/Sidebar";
import { EditorTabs, Breadcrumb } from "@/components/ide/EditorTabs";
import { StatusBar } from "@/components/ide/StatusBar";
import { SettingsDrawer } from "@/components/ide/SettingsDrawer";
import { CommandPalette } from "@/components/ide/CommandPalette";
import { BriefModal } from "@/components/ide/BriefModal";
import { Terminal } from "@/components/ide/Terminal";
import { WelcomeScreen } from "@/components/ide/WelcomeScreen";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Skills } from "@/components/sections/Skills";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pixel2Align — Premium Web & UI Design that Converts" },
      { name: "description", content: "Pixel2Align is a premium Web & UI design studio. Editorial design, conversion strategy, and pixel-precise builds." },
    ],
  }),
  component: () => (
    <IdeProvider>
      <Index />
    </IdeProvider>
  ),
});

function ActiveContent() {
  const { activeTab } = useIde();
  if (!activeTab) return <WelcomeScreen />;
  switch (activeTab) {
    case "hero": return <Hero />;
    case "about": return <About />;
    case "projects": return <Work />;
    case "skills": return <Skills />;
    case "process": return <Process />;
    case "testimonials": return <Testimonials />;
    case "contact": return <Contact />;
    default: return <WelcomeScreen />;
  }
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <TitleBar />
      <div className="flex-1 flex min-h-0">
        <Sidebar />
        <main className="flex-1 min-w-0 flex flex-col bg-editor">
          <EditorTabs />
          <Breadcrumb />
          <div className="flex-1 overflow-y-auto">
            <ActiveContent />
          </div>
          <Terminal />
        </main>
      </div>
      <StatusBar />
      <SettingsDrawer />
      <CommandPalette />
      <BriefModal />
      <Toaster position="bottom-right" />
    </div>
  );
}
