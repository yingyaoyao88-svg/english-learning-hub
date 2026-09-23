import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BuildingResourceCard } from "@/components/building-resource-card";
import { curatedResources } from "@/lib/resources/catalog";

const resource = curatedResources[0];
afterEach(cleanup);

describe("BuildingResourceCard", () => {
  it("exposes a labelled building button and its expanded panel", () => {
    const onToggle = vi.fn();
    const { rerender } = render(
      <BuildingResourceCard resource={resource} expanded={false} onToggle={onToggle} />,
    );
    const building = screen.getByRole("button", { name: `查看 ${resource.name}` });
    fireEvent.click(building);
    expect(onToggle).toHaveBeenCalledOnce();
    rerender(<BuildingResourceCard resource={resource} expanded onToggle={onToggle} />);
    expect(building).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: `${resource.name} 详情` })).toBeVisible();
    expect(screen.getByRole("link", { name: `进入 ${resource.name}` })).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("closes on Escape and returns focus to the building", () => {
    const onToggle = vi.fn();
    render(<BuildingResourceCard resource={resource} expanded onToggle={onToggle} />);
    const building = screen.getByRole("button", { name: `查看 ${resource.name}` });
    building.focus();
    fireEvent.keyDown(building, { key: "Escape" });
    expect(onToggle).toHaveBeenCalledOnce();
    expect(building).toHaveFocus();
  });

  it("uses the responsive building and flashcard layout hooks", () => {
    render(<BuildingResourceCard resource={resource} expanded onToggle={() => undefined} />);
    expect(screen.getByTestId("building-card")).toHaveClass("building-card");
    expect(screen.getByRole("region")).toHaveClass("resource-flashcard");
  });
});
