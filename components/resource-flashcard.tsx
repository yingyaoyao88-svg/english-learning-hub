import { ArrowUpRight } from "lucide-react";
import type { KeyboardEventHandler } from "react";
import type { Resource } from "@/lib/resources/types";

const price = { free: "免费", freemium: "部分免费", paid: "付费" };
const level = { beginner: "入门", intermediate: "中级", advanced: "高级", all: "所有水平" };

export function ResourceFlashcard({
  resource,
  panelId,
  onKeyDown,
}: {
  resource: Resource;
  panelId: string;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
}) {
  return <aside
    id={panelId}
    role="region"
    aria-label={`${resource.name} 详情`}
    tabIndex={-1}
    onKeyDown={onKeyDown}
    className="resource-flashcard"
  >
    <div className="flex flex-wrap items-center gap-2">
      <span className="price-chip">{price[resource.priceType]}</span>
      <span className="text-xs font-bold text-[var(--forest-soft)]">{level[resource.level]}</span>
      {resource.sourceUpdatedAt && <span className="rounded-full bg-[var(--sky-wash)] px-2 py-1 text-xs font-bold text-[var(--forest-soft)]">2026 更新</span>}
    </div>
    <h3 className="font-editorial mt-3 text-2xl leading-tight">{resource.name}</h3>
    <p className="mt-2 text-xs font-bold text-[var(--forest-soft)]">{resource.skills.join(" · ")}</p>
    <p className="mt-4 leading-7 text-muted-foreground">{resource.description}</p>
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`进入 ${resource.name}`}
      className="visit-link mt-5 w-fit rounded-xl bg-primary px-4 py-2.5 text-primary-foreground"
    >
      进入网站 <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </a>
  </aside>;
}
