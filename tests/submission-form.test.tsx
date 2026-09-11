import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SubmissionForm } from "@/components/submission-form";

describe("submission form", () => {
  it("labels the information needed for human review", () => {
    render(<SubmissionForm />);
    expect(screen.getByLabelText("网站名称")).toBeVisible();
    expect(screen.getByLabelText("网站网址")).toBeVisible();
    expect(screen.getByRole("button", { name: "提交推荐" })).toBeVisible();
  });
});
