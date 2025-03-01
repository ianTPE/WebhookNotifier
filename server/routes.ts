import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/webhook", async (req, res) => {
    try {
      // Replace this URL with the actual Make.com webhook URL in production
      const webhookUrl = process.env.MAKE_WEBHOOK_URL || "https://hook.make.com/your-webhook-endpoint";
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Hello World!"
        }),
      });

      if (!response.ok) {
        throw new Error("Webhook failed");
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to send webhook" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
