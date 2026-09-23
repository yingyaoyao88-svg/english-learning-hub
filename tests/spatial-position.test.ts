import { describe, expect, it } from "vitest";
import { spatialProgress } from "@/lib/resources/spatial";

describe("spatialProgress", () => {
  it("maps the scroll range across every resource and clamps both ends", () => {
    expect(spatialProgress(-100, 500, 4)).toBe(0);
    expect(spatialProgress(250, 500, 4)).toBe(1.5);
    expect(spatialProgress(900, 500, 4)).toBe(3);
  });

  it("returns the first position when there is only one resource", () => {
    expect(spatialProgress(250, 500, 1)).toBe(0);
  });
});
