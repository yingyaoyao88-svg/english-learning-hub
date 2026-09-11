import { z } from "zod";
import { normalizeResourceUrl } from "./url";
import { priceTypes, resourceCategories, resourceLevels } from "./types";

export const submissionSchema = z.object({
  name: z.string().trim().min(2, "请填写网站名称").max(80),
  url: z.string().trim().transform((value, ctx) => { try { return normalizeResourceUrl(value); } catch { ctx.addIssue({ code: z.ZodIssueCode.custom, message: "请输入有效的 HTTP 或 HTTPS 网址" }); return z.NEVER; } }),
  description: z.string().trim().min(20, "简介至少需要 20 个字").max(300),
  category: z.enum(resourceCategories),
  skills: z.array(z.string().trim().min(1).max(20)).min(1).max(5),
  level: z.enum(resourceLevels),
  priceType: z.enum(priceTypes),
  recommendation: z.string().trim().min(20, "推荐理由至少需要 20 个字").max(500),
});
export const resourcePatchSchema = submissionSchema.partial();

export type ValidSubmission = z.infer<typeof submissionSchema>;
