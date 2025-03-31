CREATE TABLE IF NOT EXISTS "projects_invited_members" (
	"project_id" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "projects_invited_members_project_id_email_unique" UNIQUE("project_id","email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_invited_members" ADD CONSTRAINT "projects_invited_members_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
