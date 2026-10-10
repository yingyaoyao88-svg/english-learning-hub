import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ResourceDirectory } from "@/components/resource-directory";
import { curatedResources } from "@/lib/resources/catalog";

vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("offline"))));
vi.stubGlobal("scrollTo", vi.fn());
afterEach(cleanup);

describe("ResourceDirectory spatial interactions", () => {
  it("lets the current card receive pointer input through the 3D rail", () => {
    const { container } = render(<ResourceDirectory resources={curatedResources.slice(0, 2)} />);
    expect(container.querySelector(".spatial-card-rail")).toHaveStyle({ pointerEvents: "none" });
    expect(screen.getByTestId("spatial-track")).toHaveStyle({ height: "calc(100vh + 1 * 120vh)" });
  });

  it("offers a compact topic index inside the card stage", () => {
    render(<ResourceDirectory resources={curatedResources.slice(0, 2)} />);
    fireEvent.click(screen.getByRole("button", { name: "只看听力资源" }));
    expect(screen.getByRole("button", { name: "只看听力资源" })).toHaveAttribute("aria-pressed", "true");
  }, 20000);

  it("closes details and scrolls when an exposed neighbouring website is selected", () => {
    render(<ResourceDirectory resources={curatedResources.slice(0, 2)} />);
    fireEvent.click(screen.getByRole("button", { name: "查看 BBC Learning English" }));
    fireEvent.click(screen.getByRole("button", { name: "选择 VOA Learning English" }));
    expect(screen.queryByRole("region", { name: "BBC Learning English 详情" })).not.toBeInTheDocument();
    expect(window.scrollTo).toHaveBeenCalledWith(expect.objectContaining({ behavior: "smooth" }));
  });

  it("renders the selected website as an independent side panel with an external link", () => {
    render(<ResourceDirectory resources={curatedResources.slice(0, 1)} />);
    fireEvent.click(screen.getByRole("button", { name: "查看 BBC Learning English" }));

    const panel = screen.getByRole("region", { name: "BBC Learning English 详情" });
    expect(panel.closest('[data-testid="spatial-resource-card"]')).toBeNull();
    expect(screen.getByRole("link", { name: "进入 BBC Learning English" })).toHaveAttribute(
      "href",
      curatedResources[0].url,
    );
  });

  it("closes open details when the search changes", () => {
    render(<ResourceDirectory resources={curatedResources.slice(0, 2)} />);
    fireEvent.click(screen.getByRole("button", { name: "查看 BBC Learning English" }));
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "VOA" } });
    expect(screen.queryByRole("region", { name: "BBC Learning English 详情" })).not.toBeInTheDocument();
  });

  it("closes the selected website when the grid background is clicked", () => {
    render(<ResourceDirectory resources={curatedResources.slice(0, 1)} />);
    fireEvent.click(screen.getByRole("button", { name: "查看 BBC Learning English" }));
    fireEvent.click(screen.getByTestId("spatial-track"));
    expect(screen.queryByRole("region", { name: "BBC Learning English 详情" })).not.toBeInTheDocument();
  });
});
