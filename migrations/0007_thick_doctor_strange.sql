ALTER TABLE "workspaces" ADD COLUMN "owner_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_name_owner_id_unique" UNIQUE("name","owner_id");