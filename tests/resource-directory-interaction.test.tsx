import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ResourceDirectory } from "@/components/resource-directory";
import { curatedResources } from "@/lib/resources/catalog";

vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("offline"))));
afterEach(cleanup);

describe("ResourceDirectory building interactions", () => {
  it("keeps only the most recently selected website open", () => {
    render(<ResourceDirectory resources={curatedResources.slice(0, 2)} />);
    fireEvent.click(screen.getByRole("button", { name: "查看 BBC Learning English" }));
    fireEvent.click(screen.getByRole("button", { name: "查看 VOA Learning English" }));
    expect(screen.queryByRole("region", { name: "BBC Learning English 详情" })).not.toBeInTheDocument();
    expect(screen.getByRole("region", { name: "VOA Learning English 详情" })).toBeVisible();
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
    fireEvent.click(screen.getByTestId("building-grid"));
    expect(screen.queryByRole("region", { name: "BBC Learning English 详情" })).not.toBeInTheDocument();
  });
});
