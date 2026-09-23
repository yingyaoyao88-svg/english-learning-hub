import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("home shell", () => {
  it("puts adult learners directly in the resource discovery experience", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "找到适合你的英语学习资源" }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "推荐网站" })).toHaveAttribute(
      "href",
      "/submit",
    );
    expect(screen.getByRole("searchbox", { name: "搜索学习资源" })).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "查看 BBC Learning English" }));
    expect(screen.getByRole("link", { name: /进入 BBC Learning English/ })).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
  });
});
