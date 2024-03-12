DROP TABLE "workspaces";--> statement-breakpoint
ALTER TABLE "files" DROP CONSTRAINT "files_workspace_id_workspaces_id_fk";
--> statement-breakpoint
ALTER TABLE "folders" DROP CONSTRAINT "folders_workspace_id_workspaces_id_fk";
--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "likes" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "files" DROP COLUMN IF EXISTS "workspace_id";--> statement-breakpoint
ALTER TABLE "folders" DROP COLUMN IF EXISTS "workspace_id";