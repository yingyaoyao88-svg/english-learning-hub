import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BuildingIllustration } from "@/components/building-illustration";
import { buildingThemeFor } from "@/lib/resources/buildings";

describe("BuildingIllustration", () => {
  it("labels the decorative building kind without putting website text in SVG", () => {
    const { container } = render(
      <BuildingIllustration theme={buildingThemeFor("reading", "A&B/LongName")} active={false} />,
    );
    expect(screen.getByLabelText("书店建筑")).toBeVisible();
    expect(container.querySelector("svg text")).toBeNull();
  });

  it("marks the building as lit when active", () => {
    render(<BuildingIllustration theme={buildingThemeFor("listening")} active />);
    expect(screen.getByLabelText("钟楼建筑")).toHaveAttribute("data-lit", "true");
  });
});
