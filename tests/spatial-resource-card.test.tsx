import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SpatialResourceCard } from "@/components/spatial-resource-card";
import { curatedResources } from "@/lib/resources/catalog";

afterEach(cleanup);

describe("SpatialResourceCard", () => {
  it("exposes its depth position and opens an accessible detail panel", () => {
    const onToggle = vi.fn();
    render(<SpatialResourceCard resource={curatedResources[0]} index={0} position={0} expanded={false} onToggle={onToggle} onSelect={vi.fn()}/>);
    expect(screen.getByTestId("spatial-resource-card")).toHaveStyle({ "--spatial-position": "0" });
    fireEvent.click(screen.getByRole("button", { name: "查看 BBC Learning English" }));
    expect(onToggle).toHaveBeenCalledOnce();
  });

  it("lets an exposed neighbouring card be selected without opening its details", () => {
    const onToggle = vi.fn();
    const onSelect = vi.fn();
    render(<SpatialResourceCard resource={curatedResources[1]} index={1} position={1} expanded={false} onToggle={onToggle} onSelect={onSelect}/>);

    fireEvent.click(screen.getByRole("button", { name: "选择 VOA Learning English" }));
    expect(onSelect).toHaveBeenCalledOnce();
    expect(onToggle).not.toHaveBeenCalled();
    expect(screen.getByTestId("spatial-resource-card")).toHaveAttribute("data-selectable", "true");
  });
});
