export function TitleBar() {
  return (
    <div className="h-9 bg-titlebar border-b border-border flex items-center px-3 select-none text-xs font-mono text-muted-foreground">
      <div className="flex items-center gap-2 mr-4">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="hidden md:flex gap-4">
        {["File", "Edit", "View", "Go", "Run", "Terminal", "Help"].map((m) => (
          <span key={m} className="hover:text-foreground cursor-default">{m}</span>
        ))}
        <span className="text-accent ml-2">✦ Studio</span>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-background/60 border border-border min-w-[280px] justify-center">
          <span>🔍</span>
          <span>pixel2align : portfolio</span>
          <kbd className="ml-2 px-1.5 py-0.5 rounded bg-surface border border-border text-[10px]">Ctrl</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px]">P</kbd>
        </div>
      </div>
      <div className="hidden md:block">⌘</div>
    </div>
  );
}
