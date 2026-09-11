import { BookOpenText } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="border-b border-border/80 bg-background/92 backdrop-blur">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12" aria-label="主导航">
        <a href="/" className="group flex items-center gap-3" aria-label="英语学习导航首页">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--forest)] text-white transition-transform group-hover:-rotate-3"><BookOpenText aria-hidden="true" className="h-5 w-5" /></span>
          <span><strong className="block text-[15px] leading-tight tracking-[-0.01em]">英语学习导航</strong><span className="hidden text-xs text-muted-foreground sm:block">Learn better, one link at a time.</span></span>
        </a>
        <div className="flex items-center gap-3">
          <a href="#resources" className="hidden text-sm font-semibold text-muted-foreground transition hover:text-foreground sm:inline-flex">浏览资源</a>
          <a href="/submit" className="rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground shadow-[0_5px_0_var(--accent-deep)] transition hover:-translate-y-0.5 hover:shadow-[0_7px_0_var(--accent-deep)] active:translate-y-1 active:shadow-none">推荐网站</a>
        </div>
      </nav>
    </header>
  );
}
