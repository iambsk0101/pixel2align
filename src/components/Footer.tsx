import logo from "@/assets/pixel2align-logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Pixel2Align" className="h-7 w-auto dark:invert dark:brightness-200" />
        </div>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Pixel2Align. Designed with intent.
        </div>
        <div className="flex items-center gap-5 text-sm">
          <a href="#" className="story-link">Instagram</a>
          <a href="#" className="story-link">Behance</a>
          <a href="#" className="story-link">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
