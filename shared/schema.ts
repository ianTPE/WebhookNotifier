import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const webhookRequests = pgTable("webhook_requests", {
  id: serial("id").primaryKey(),
  message: text("message").notNull(),
  success: boolean("success").notNull(),
});

export const insertWebhookRequestSchema = createInsertSchema(webhookRequests).pick({
  message: true,
  success: true,
});

export type InsertWebhookRequest = z.infer<typeof insertWebhookRequestSchema>;
export type WebhookRequest = typeof webhookRequests.$inferSelect;
