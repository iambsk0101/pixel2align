import { useIde } from "./IdeContext";
import { toast } from "sonner";

export function BriefModal() {
  const { briefOpen, closeBrief } = useIde();
  if (!briefOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm grid place-items-center p-4" onMouseDown={closeBrief}>
      <div onMouseDown={(e) => e.stopPropagation()} className="w-full max-w-md bg-surface-elevated border border-border rounded-md shadow-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center gap-3">
          <span className="text-red-400 font-bold">PDF</span>
          <span className="font-mono text-sm">Pixel2Align_Brief.pdf</span>
          <button onClick={closeBrief} className="ml-auto text-muted-foreground hover:text-foreground">×</button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-muted-foreground">A 1-page brief with our process, pricing tiers, and recent results. Send your details and we'll deliver it instantly.</p>
          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Brief sent — check your inbox."); closeBrief(); }}
            className="space-y-3"
          >
            <input required type="email" placeholder="you@studio.com" className="w-full px-3 py-2 rounded bg-surface border border-border outline-none focus:border-accent text-sm font-mono" />
            <button className="w-full px-4 py-2.5 rounded bg-accent text-accent-foreground font-mono text-sm font-semibold hover:translate-y-[-1px] transition-transform">↓ Download Brief</button>
          </form>
        </div>
      </div>
    </div>
  );
}
