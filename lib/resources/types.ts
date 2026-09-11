export const resourceCategories = ["general", "listening", "speaking", "reading", "writing", "vocabulary-grammar", "business", "ielts", "toefl"] as const;
export const resourceLevels = ["beginner", "intermediate", "advanced", "all"] as const;
export const priceTypes = ["free", "freemium", "paid"] as const;
export const reviewStatuses = ["pending", "published", "rejected"] as const;

export type ResourceCategory = (typeof resourceCategories)[number];
export type ResourceLevel = (typeof resourceLevels)[number];
export type PriceType = (typeof priceTypes)[number];
export type ReviewStatus = (typeof reviewStatuses)[number];

export interface Resource {
  id: string; name: string; url: string; normalizedUrl: string; description: string;
  category: ResourceCategory; skills: string[]; level: ResourceLevel; priceType: PriceType;
  recommendation: string; status: ReviewStatus; icon?: string; createdAt: string; updatedAt: string; publishedAt?: string;
}

export type ResourceSubmission = Pick<Resource, "name" | "url" | "description" | "category" | "skills" | "level" | "priceType" | "recommendation">;
