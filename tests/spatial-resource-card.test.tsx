import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SpatialResourceCard } from "@/components/spatial-resource-card";
import { curatedResources } from "@/lib/resources/catalog";

afterEach(cleanup);

describe("SpatialResourceCard", () => {
  it("exposes its depth position and opens an accessible detail panel", () => {
    const onToggle = vi.fn();
    render(<SpatialResourceCard resource={curatedResources[0]} index={0} position={-1.25} expanded={false} onToggle={onToggle}/>);
    expect(screen.getByTestId("spatial-resource-card")).toHaveStyle({ "--spatial-position": "-1.25" });
    fireEvent.click(screen.getByRole("button", { name: "查看 BBC Learning English" }));
    expect(onToggle).toHaveBeenCalledOnce();
  });
});
