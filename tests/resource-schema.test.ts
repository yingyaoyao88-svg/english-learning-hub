import { describe, expect, it } from "vitest";
import { submissionSchema } from "@/lib/resources/schema";
import { normalizeResourceUrl } from "@/lib/resources/url";

const valid = { name: "Example English", url: "https://example.com/learn/", description: "A practical English learning resource for independent adults.", category: "general", skills: ["综合"], level: "all", priceType: "free", recommendation: "课程结构清晰，适合建立稳定的日常学习习惯。" };

describe("resource submission validation", () => {
  it("accepts a complete submission", () => expect(submissionSchema.safeParse(valid).success).toBe(true));
  it("rejects non-web protocols", () => expect(submissionSchema.safeParse({ ...valid, url: "javascript:alert(1)" }).success).toBe(false));
  it("normalizes equivalent URLs for duplicate checks", () => expect(normalizeResourceUrl("HTTPS://BBC.COM/learningenglish/")).toBe("https://bbc.com/learningenglish"));
});
