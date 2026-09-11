import { describe, expect, it } from "vitest";
import { filterResources } from "@/lib/resources/filter";
import { curatedResources } from "@/lib/resources/catalog";

describe("resource filtering", () => {
  it("combines text and category filters", () => {
    const result = filterResources(curatedResources, { query: "BBC", category: "listening", level: "all", price: "all" });
    expect(result.map((item) => item.name)).toEqual(["BBC Learning English"]);
  });
  it("returns no items when filters do not match", () => {
    expect(filterResources(curatedResources, { query: "不存在的资源", category: "all", level: "all", price: "all" })).toEqual([]);
  });
});
