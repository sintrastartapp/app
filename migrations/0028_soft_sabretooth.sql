ALTER TABLE "landing_pages" ADD COLUMN "startup_logo" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_pages" ADD COLUMN "key_benefits_header" text DEFAULT 'Key Benefits' NOT NULL;--> statement-breakpoint
ALTER TABLE "landing_pages" ADD COLUMN "features_header" text DEFAULT 'Features' NOT NULL;