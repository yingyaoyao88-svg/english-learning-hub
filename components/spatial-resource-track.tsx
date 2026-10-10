"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { ResourceFlashcard } from "@/components/resource-flashcard";
import { SpatialResourceCard } from "@/components/spatial-resource-card";
import { spatialProgress } from "@/lib/resources/spatial";
import type { Resource, ResourceCategory } from "@/lib/resources/types";

export function SpatialResourceTrack({ resources, categoryLabel, categories, activeCategory, expandedResourceId, onToggle, onDismiss, onCategoryChange }: {
  resources: Resource[];
  categoryLabel: string;
  categories: [ResourceCategory | "all", string][];
  activeCategory: ResourceCategory | "all";
  expandedResourceId: string | null;
  onToggle: (id: string) => void;
  onDismiss: () => void;
  onCategoryChange: (category: ResourceCategory | "all") => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      setProgress(spatialProgress(-rect.top, rect.height - window.innerHeight, resources.length));
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [resources.length]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const start = window.scrollY + track.getBoundingClientRect().top;
    const range = Math.max(track.offsetHeight - window.innerHeight, 0);
    const top = resources.length <= 1 ? start : start + (index / (resources.length - 1)) * range;
    onDismiss();
    window.scrollTo({ top, behavior: "smooth" });
  };

  const chooseCategory = (value: ResourceCategory | "all") => {
    const track = trackRef.current;
    const top = track ? window.scrollY + track.getBoundingClientRect().top : window.scrollY;
    onCategoryChange(value);
    window.scrollTo({ top, behavior: "smooth" });
  };

  const height = `calc(100vh + ${Math.max(resources.length - 1, 0)} * 120vh)`;
  const style = { height, "--track-progress": String(progress) } as CSSProperties;
  const current = Math.min(resources.length, Math.round(progress) + 1);
  const selectedResource = resources.find((resource) => resource.id === expandedResourceId);

  return <div ref={trackRef} data-testid="spatial-track" className="spatial-track" style={style} onClick={onDismiss}>
    <div className="spatial-stage">
      <div className="spatial-progress" style={{ width: `${resources.length <= 1 ? 100 : (progress / (resources.length - 1)) * 100}%` }}/>
      <div className="spatial-stage-label">滚动探索 · 点击查看</div>
      <div className="spatial-stage-counter">{String(current).padStart(2, "0")} / {String(resources.length).padStart(2, "0")}</div>
      <nav className="spatial-topic-index" aria-label="学习主题快捷选择" onClick={(event) => event.stopPropagation()}>
        {categories.map(([value, label]) => <button key={value} type="button" aria-label={`只看${label}资源`} aria-pressed={activeCategory === value} onClick={() => chooseCategory(value)}>{label}</button>)}
      </nav>
      <div className="spatial-orbit" aria-hidden="true"/>
      <div className="spatial-category-word" aria-hidden="true">{categoryLabel}</div>
      <div className="spatial-card-rail" style={{ pointerEvents: "none" }}>
        {resources.map((resource, index) => <SpatialResourceCard
          key={resource.id}
          resource={resource}
          index={index}
          position={index - progress}
          expanded={expandedResourceId === resource.id}
          onToggle={() => onToggle(resource.id)}
          onSelect={() => scrollToIndex(index)}
        />)}
      </div>
      {selectedResource && <div className="spatial-side-panel" onClick={(event) => event.stopPropagation()}>
        <ResourceFlashcard resource={selectedResource} panelId={`resource-panel-${selectedResource.id}`}/>
      </div>}
      <p className="spatial-stage-hint">点击露出的卡片直接选择；再次点击中央卡片查看详情。</p>
    </div>
  </div>;
}
