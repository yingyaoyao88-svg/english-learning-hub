import { ArrowUpRight } from "lucide-react";
import type { Resource } from "@/lib/resources/types";

const price = { free: "免费", freemium: "部分免费", paid: "付费" };
const level = { beginner: "入门", intermediate: "中级", advanced: "高级", all: "所有水平" };

export function ResourceCard({ resource }: { resource: Resource }) {
  return <article className="resource-card flex h-full flex-col">
    <div className="flex items-start justify-between gap-4"><div className="flex items-center gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--sky-wash)] text-lg font-black text-[var(--forest)]">{resource.name[0]}</span><div><h3 className="text-lg font-bold">{resource.name}</h3><p className="mt-1 text-xs font-bold text-[var(--forest-soft)]">{resource.skills.join(" · ")}</p></div></div><span className="price-chip shrink-0">{price[resource.priceType]}</span></div>
    <p className="mt-4 flex-1 leading-7 text-muted-foreground">{resource.description}</p>
    <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4"><div className="flex flex-wrap items-center gap-2"><span className="text-sm text-muted-foreground">{level[resource.level]}</span>{resource.sourceUpdatedAt&&<span className="rounded-full bg-[var(--sky-wash)] px-2 py-1 text-xs font-bold text-[var(--forest-soft)]">2026 更新</span>}</div><a href={resource.url} target="_blank" rel="noopener noreferrer" aria-label={`访问 ${resource.name}`} className="visit-link">访问网站 <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a></div>
  </article>;
}
