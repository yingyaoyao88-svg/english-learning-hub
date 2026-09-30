import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ResourceDirectory } from "@/components/resource-directory";
import { curatedResources } from "@/lib/resources/catalog";

vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("offline"))));
afterEach(cleanup);

describe("ResourceDirectory spatial interactions", () => {
  it("keeps only the most recently selected website open", () => {
    render(<ResourceDirectory resources={curatedResources.slice(0, 2)} />);
    fireEvent.click(screen.getByRole("button", { name: "查看 BBC Learning English" }));
    fireEvent.click(screen.getByRole("button", { name: "查看 VOA Learning English" }));
    expect(screen.queryByRole("region", { name: "BBC Learning English 详情" })).not.toBeInTheDocument();
    expect(screen.getByRole("region", { name: "VOA Learning English 详情" })).toBeVisible();
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
