"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { ResourceFlashcard } from "@/components/resource-flashcard";
import { SpatialResourceCard } from "@/components/spatial-resource-card";
import { spatialProgress } from "@/lib/resources/spatial";
import type { Resource } from "@/lib/resources/types";

export function SpatialResourceTrack({ resources, categoryLabel, expandedResourceId, onToggle, onDismiss }: {
  resources: Resource[];
  categoryLabel: string;
  expandedResourceId: string | null;
  onToggle: (id: string) => void;
  onDismiss: () => void;
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

  const height = `calc(100vh + ${Math.max(resources.length - 1, 0)} * 68vh)`;
  const style = { height, "--track-progress": String(progress) } as CSSProperties;
  const current = Math.min(resources.length, Math.round(progress) + 1);
  const selectedResource = resources.find((resource) => resource.id === expandedResourceId);

  return <div ref={trackRef} data-testid="spatial-track" className="spatial-track" style={style} onClick={onDismiss}>
    <div className="spatial-stage">
      <div className="spatial-progress" style={{ width: `${resources.length <= 1 ? 100 : (progress / (resources.length - 1)) * 100}%` }}/>
      <div className="spatial-stage-label">滚动探索 · 点击查看</div>
      <div className="spatial-stage-counter">{String(current).padStart(2, "0")} / {String(resources.length).padStart(2, "0")}</div>
      <div className="spatial-orbit" aria-hidden="true"/>
      <div className="spatial-category-word" aria-hidden="true">{categoryLabel}</div>
      <div className="spatial-card-rail">
        {resources.map((resource, index) => <SpatialResourceCard
          key={resource.id}
          resource={resource}
          index={index}
          position={index - progress}
          expanded={expandedResourceId === resource.id}
          onToggle={() => onToggle(resource.id)}
        />)}
      </div>
      {selectedResource && <div className="spatial-side-panel" onClick={(event) => event.stopPropagation()}>
        <ResourceFlashcard resource={selectedResource} panelId={`resource-panel-${selectedResource.id}`}/>
      </div>}
      <p className="spatial-stage-hint">资源进入中央时成为焦点。继续滚动切换，或点击当前卡片查看详情。</p>
    </div>
  </div>;
}
