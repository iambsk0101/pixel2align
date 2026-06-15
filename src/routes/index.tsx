import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { IdeProvider, useIde } from "@/components/ide/IdeContext";
import { SoundProvider } from "@/components/ide/SoundContext";
import { TitleBar } from "@/components/ide/TitleBar";
import { Sidebar } from "@/components/ide/Sidebar";
import { EditorTabs, Breadcrumb } from "@/components/ide/EditorTabs";
import { StatusBar } from "@/components/ide/StatusBar";
import { SettingsDrawer } from "@/components/ide/SettingsDrawer";
import { CommandPalette } from "@/components/ide/CommandPalette";
import { BriefModal } from "@/components/ide/BriefModal";
import { Terminal } from "@/components/ide/Terminal";
import { MobileNav } from "@/components/ide/MobileNav";
import { WelcomeScreen } from "@/components/ide/WelcomeScreen";
import { CopilotPanel } from "@/components/ide/Copilot";
import { BootLoader } from "@/components/ide/BootLoader";
import { CustomCursor } from "@/components/ide/CustomCursor";
import { KonamiUnlock } from "@/components/ide/KonamiUnlock";
import { HireMeToast } from "@/components/ide/HireMeToast";
import { AnalyticsTracker } from "@/components/ide/AnalyticsTracker";
import { Hero } from "@/components/sections/Hero";
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
      { name: "description", content: "Pixel2Align is a premium Web & UI design studio. Editorial design, conversion strategy, and pixel-precise builds." },
    ],
  }),
  component: () => (
    <SoundProvider>
      <IdeProvider>
        <Index />
      </IdeProvider>
    </SoundProvider>
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
  const ide = useIde();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ide.booted) return;
    const seen = sessionStorage.getItem("p2a-booted");
    if (seen) ide.setBooted(true);
  }, [ide]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, left: 0 });
  }, [ide.activeTab]);

  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {!ide.booted && (
        <BootLoader
          onDone={() => {
            try { sessionStorage.setItem("p2a-booted", "1"); } catch {}
            ide.setBooted(true);
          }}
        />
      )}
      <TitleBar />
      {!ide.minimized && (
        <div className="flex-1 flex min-h-0">
          <Sidebar />
          <main className="flex-1 min-w-0 flex flex-col bg-editor">
            <EditorTabs />
            <Breadcrumb />
            <div ref={scrollRef} className="flex-1 overflow-y-auto">
              <ActiveContent />
              <Footer />
            </div>
            <Terminal />
          </main>
        </div>
      )}
      {ide.minimized && (
        <button
          onClick={ide.toggleMinimize}
          className="flex-1 grid place-items-center bg-background text-muted-foreground hover:text-foreground transition-colors font-mono text-sm"
        >
          Window minimized — click to restore
        </button>
      )}
      <StatusBar />
      <MobileNav />
      <SettingsDrawer />
      <CommandPalette />
      <BriefModal />
      <CopilotPanel />
      <Toaster position="bottom-right" />
      <CustomCursor />
      <KonamiUnlock />
      <HireMeToast />
      <AnalyticsTracker />
    </div>
  );
}
