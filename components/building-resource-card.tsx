"use client";

import { useRef } from "react";
import { BuildingIllustration } from "@/components/building-illustration";
import { ResourceFlashcard } from "@/components/resource-flashcard";
import { buildingThemeFor } from "@/lib/resources/buildings";
import type { Resource } from "@/lib/resources/types";

export function BuildingResourceCard({
  resource,
  expanded,
  onToggle,
}: {
  resource: Resource;
  expanded: boolean;
  onToggle: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = `resource-panel-${resource.id}`;
  const theme = buildingThemeFor(resource.category, resource.id);

  return <article
    data-testid="building-card"
    onClick={(event) => event.stopPropagation()}
    onKeyDown={(event) => {
      if (event.key !== "Escape" || !expanded) return;
      onToggle();
      buttonRef.current?.focus();
    }}
    className={`building-card${expanded ? " building-card-active" : ""}`}
  >
    <button
      ref={buttonRef}
      type="button"
      aria-label={`查看 ${resource.name}`}
      aria-expanded={expanded}
      aria-controls={panelId}
      onClick={onToggle}
      className="building-button"
    >
      <span className="building-stage">
        <BuildingIllustration theme={theme} active={expanded}/>
      </span>
      <span className="building-sign">{resource.name}</span>
      <span className="mt-2 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-bold text-[var(--forest-soft)]">{resource.skills.slice(0, 2).join(" · ")}</span>
        <span className="price-chip">{resource.priceType === "free" ? "免费" : resource.priceType === "freemium" ? "部分免费" : "付费"}</span>
      </span>
    </button>
    {expanded && (
      <ResourceFlashcard resource={resource} panelId={panelId}/>
    )}
  </article>;
}
