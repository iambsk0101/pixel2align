import { useIde, FILE_ORDER, FILES } from "./IdeContext";
import { Logo } from "@/components/Logo";

export function WelcomeScreen() {
  const { openFile, openPalette } = useIde();
  return (
    <div className="min-h-[70vh] grid place-items-center px-6 py-16">
      <div className="max-w-2xl w-full">
        <Logo className="h-12 w-auto mb-6 opacity-95" />
        <h1 className="sr-only">Pixel2Align — Premium Web & UI Design Studio</h1>
        <p className="mt-2 text-sm font-mono text-muted-foreground">Independent web &amp; UI design studio building fast, accessible, conversion-led websites.</p>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-mono text-muted-foreground mb-2">Start</div>
            <ul className="space-y-1.5 text-sm">
              <li><button onClick={() => openFile("hero")} className="text-accent hover:underline">→ Open hero.tsx</button></li>
              <li><button onClick={() => openFile("projects")} className="text-accent hover:underline">→ Browse projects.js</button></li>
              <li><button onClick={() => openFile("contact")} className="text-accent hover:underline">→ Start a project (contact.md)</button></li>
              <li><button onClick={openPalette} className="text-accent hover:underline">→ Go to file… (Ctrl+P)</button></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-mono text-muted-foreground mb-2">Recent files</div>
            <ul className="space-y-1.5 text-sm font-mono">
              {FILE_ORDER.slice(0, 5).map((id) => {
                const f = FILES[id];
                return (
                  <li key={id}>
                    <button onClick={() => openFile(id)} className="hover:text-accent transition-colors flex items-center gap-2">
                      <span className={`text-[10px] font-bold w-4 text-center ${f.iconColor}`}>{f.icon}</span>
                      {f.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
