import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { askCopilot } from "@/utils/copilot.functions";
import { Sparkles, X, Send, Loader2 } from "lucide-react";
import { useIde } from "./IdeContext";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What does Pixel2Align do?",
  "Help me write a project brief",
  "Which tier is right for me?",
  "Show me your process",
];

export function CopilotPanel() {
  const ide = useIde();
  const ask = useServerFn(askCopilot);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hey — I'm **Pixel's Copilot** ✦. Ask me anything about the studio, services, or your project." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: t }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await ask({ data: { messages: next } });
      setMessages((m) => [...m, { role: "assistant", content: res.reply }]);
    } finally {
      setLoading(false);
    }
  };

  if (!ide.copilotOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]" onMouseDown={ide.closeCopilot}>
      <aside
        onMouseDown={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 bottom-0 w-full sm:w-[420px] bg-sidebar border-l border-border flex flex-col shadow-2xl animate-fade-in"
      >
        <header className="h-11 flex items-center gap-2 px-4 border-b border-border">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="font-mono text-sm">Pixel's Copilot</span>
          <span className="ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded border border-border text-muted-foreground">AI</span>
          <button onClick={ide.closeCopilot} className="ml-auto h-8 w-8 grid place-items-center hover:bg-surface rounded">
            <X className="h-4 w-4" />
          </button>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 text-sm">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
              <div
                className={`max-w-[85%] px-3 py-2 rounded-lg whitespace-pre-wrap leading-relaxed ${
                  m.role === "user"
                    ? "bg-accent text-accent-foreground font-mono text-[13px]"
                    : "bg-surface border border-border"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> thinking…
            </div>
          )}
          {messages.length <= 1 && (
            <div className="pt-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-2.5 py-1.5 rounded border border-border hover:border-accent hover:text-accent transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="border-t border-border p-3 flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything…"
            className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-sm font-mono outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="h-9 w-9 grid place-items-center rounded-md bg-accent text-accent-foreground disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </aside>
    </div>
  );
}
