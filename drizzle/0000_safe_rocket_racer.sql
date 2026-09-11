CREATE TABLE `resources` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`normalized_url` text NOT NULL,
	`description` text NOT NULL,
	`category` text NOT NULL,
	`skills` text NOT NULL,
	`level` text NOT NULL,
	`price_type` text NOT NULL,
	`recommendation` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`published_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_resources_normalized_url` ON `resources` (`normalized_url`);--> statement-breakpoint
CREATE INDEX `idx_resources_status` ON `resources` (`status`);--> statement-breakpoint
CREATE INDEX `idx_resources_category` ON `resources` (`category`);