"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import type { Resource } from "@/lib/resources/types";

const palettes = [
  ["#d8ff62", "#11170b"],
  ["#ff714d", "#1d0d08"],
  ["#7bc8ff", "#071621"],
  ["#eee5dc", "#17130f"],
  ["#a997ff", "#130c2b"],
] as const;

const price = { free: "免费", freemium: "部分免费", paid: "付费" };

export function SpatialResourceCard({ resource, index, position, expanded, onToggle, onSelect }: {
  resource: Resource;
  index: number;
  position: number;
  expanded: boolean;
  onToggle: () => void;
  onSelect: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = `resource-panel-${resource.id}`;
  const [background, ink] = palettes[index % palettes.length];
  const distance = Math.abs(position);
  const isCurrent = distance < 0.5;
  const isSelectable = distance < 2.6;
  const style = {
    "--spatial-position": String(position),
    "--spatial-depth": String(distance),
    "--spatial-bg": background,
    "--spatial-ink": ink,
    opacity: Math.max(0.16, 1 - distance * 0.28),
    zIndex: 100 - Math.round(distance * 8),
  } as CSSProperties;

  return <article
    data-testid="spatial-resource-card"
    data-current={String(isCurrent)}
    data-selectable={String(isSelectable)}
    data-side={position < -0.5 ? "before" : position > 0.5 ? "after" : "current"}
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
      tabIndex={isSelectable ? 0 : -1}
      aria-label={`${isCurrent ? "查看" : "选择"} ${resource.name}`}
      aria-expanded={expanded}
      aria-controls={panelId}
      onClick={isCurrent ? onToggle : onSelect}
      className="spatial-resource-button"
    >
      <span className="spatial-resource-kicker">{String(index + 1).padStart(2, "0")} / {resource.skills[0] ?? "ENGLISH"}</span>
      <span className="spatial-resource-name">{resource.name}</span>
      <span className="spatial-resource-description">{resource.description}</span>
      <span className="spatial-resource-meta"><span>{resource.skills.slice(0, 2).join(" · ")}</span><span>{price[resource.priceType]} · 查看详情 ↗</span></span>
      {!isCurrent && <span className="spatial-resource-tab" aria-hidden="true"><b>{String(index + 1).padStart(2, "0")}</b>{resource.name}</span>}
    </button>
  </article>;
}
