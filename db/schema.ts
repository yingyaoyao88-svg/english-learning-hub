import { index, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const resources = sqliteTable("resources", {
  id: text("id").primaryKey(), name: text("name").notNull(), url: text("url").notNull(), normalizedUrl: text("normalized_url").notNull(),
  description: text("description").notNull(), category: text("category").notNull(), skills: text("skills", { mode: "json" }).$type<string[]>().notNull(),
  level: text("level").notNull(), priceType: text("price_type").notNull(), recommendation: text("recommendation").notNull(), status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull(), updatedAt: text("updated_at").notNull(), publishedAt: text("published_at"),
}, (table) => [uniqueIndex("idx_resources_normalized_url").on(table.normalizedUrl), index("idx_resources_status").on(table.status), index("idx_resources_category").on(table.category)]);
