"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import { ResourceFlashcard } from "@/components/resource-flashcard";
import type { Resource } from "@/lib/resources/types";

const palettes = [
  ["#d8ff62", "#11170b"],
  ["#ff714d", "#1d0d08"],
  ["#7bc8ff", "#071621"],
  ["#eee5dc", "#17130f"],
  ["#a997ff", "#130c2b"],
] as const;

const price = { free: "免费", freemium: "部分免费", paid: "付费" };

export function SpatialResourceCard({ resource, index, position, expanded, onToggle }: {
  resource: Resource;
  index: number;
  position: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = `resource-panel-${resource.id}`;
  const [background, ink] = palettes[index % palettes.length];
  const distance = Math.abs(position);
  const style = {
    "--spatial-position": String(position),
    "--spatial-depth": String(distance),
    "--spatial-bg": background,
    "--spatial-ink": ink,
    opacity: Math.max(0.06, 1 - distance * 0.62),
    zIndex: 100 - Math.round(distance * 10),
  } as CSSProperties;

  return <article
    data-testid="spatial-resource-card"
    data-current={String(distance < 0.5)}
    className={`spatial-resource-card${expanded ? " spatial-resource-card-active" : ""}`}
    style={style}
    onClick={(event) => event.stopPropagation()}
    onKeyDown={(event) => {
      if (event.key !== "Escape" || !expanded) return;
      onToggle();
      buttonRef.current?.focus();
    }}
  >
    <button
      ref={buttonRef}
      type="button"
      tabIndex={distance < 0.65 ? 0 : -1}
      aria-label={`查看 ${resource.name}`}
      aria-expanded={expanded}
      aria-controls={panelId}
      onClick={onToggle}
      className="spatial-resource-button"
    >
      <span className="spatial-resource-kicker">{String(index + 1).padStart(2, "0")} / {resource.skills[0] ?? "ENGLISH"}</span>
      <span className="spatial-resource-name">{resource.name}</span>
      <span className="spatial-resource-description">{resource.description}</span>
      <span className="spatial-resource-meta"><span>{resource.skills.slice(0, 2).join(" · ")}</span><span>{price[resource.priceType]} · 查看详情 ↗</span></span>
    </button>
    {expanded && <ResourceFlashcard resource={resource} panelId={panelId}/>} 
  </article>;
}
