import { ResourceDirectory } from "@/components/resource-directory";
import { SiteHeader } from "@/components/site-header";
import { curatedResources } from "@/lib/resources/catalog";

export default function Home() {
  return <main className="min-h-screen bg-background text-foreground"><SiteHeader/><section className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 lg:px-12"><ResourceDirectory resources={curatedResources}/></section><footer className="border-t border-border px-5 py-8 text-center text-sm text-muted-foreground">英语学习导航 · 认真挑选，持续更新</footer></main>;
}
