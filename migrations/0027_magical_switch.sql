DO $$ BEGIN
 CREATE TYPE "public"."landing_page_state" AS ENUM('initial', 'generating', 'draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "landing_pages" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"state" "landing_page_state" DEFAULT 'initial' NOT NULL,
	"public_id" text NOT NULL,
	"startup_name" text NOT NULL,
	"hero_title" text NOT NULL,
	"one_liner_pitch" text NOT NULL,
	"form_name" text NOT NULL,
	"form_link" text NOT NULL,
	"demo_video_link" text NOT NULL,
	"photo_link" text NOT NULL,
	"key_benefits_1_title" text NOT NULL,
	"key_benefits_1_description" text NOT NULL,
	"key_benefits_2_title" text NOT NULL,
	"key_benefits_2_description" text NOT NULL,
	"key_benefits_3_title" text NOT NULL,
	"key_benefits_3_description" text NOT NULL,
	"feature_1_title" text NOT NULL,
	"feature_1_description" text NOT NULL,
	"feature_2_title" text NOT NULL,
	"feature_2_description" text NOT NULL,
	"feature_3_title" text NOT NULL,
	"feature_3_description" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects_invited_members" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "landing_pages" ADD CONSTRAINT "landing_pages_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
