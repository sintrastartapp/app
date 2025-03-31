CREATE TABLE IF NOT EXISTS "users_profile" (
	"user_id" text NOT NULL,
	"name" text,
	"website" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_profile" ADD CONSTRAINT "users_profile_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
