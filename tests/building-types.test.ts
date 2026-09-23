import { describe, expect, it } from "vitest";
import { buildingThemeFor } from "@/lib/resources/buildings";

describe("buildingThemeFor", () => {
  it("maps resource categories to distinct building kinds", () => {
    expect(buildingThemeFor("listening").kind).toBe("clock-tower");
    expect(buildingThemeFor("reading").kind).toBe("bookshop");
    expect(buildingThemeFor("ielts").kind).toBe("academy-castle");
    expect(buildingThemeFor("github-skills").kind).toBe("inventor-workshop");
  });

  it("falls back to the learning center for an unknown category", () => {
    expect(buildingThemeFor("future-category").kind).toBe("learning-center");
  });

  it("uses the seed to choose a stable palette variant", () => {
    expect(buildingThemeFor("reading", "gutenberg")).toEqual(
      buildingThemeFor("reading", "gutenberg"),
    );
  });
});
