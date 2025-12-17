import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import path from "path";
import fs from "fs";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactMessageSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid input", 
          details: result.error.errors 
        });
      }

      const message = await storage.createContactMessage(result.data);
      return res.status(201).json({ 
        success: true, 
        message: "Message received successfully",
        id: message.id 
      });
    } catch (error) {
      console.error("Error saving contact message:", error);
      return res.status(500).json({ error: "Failed to save message" });
    }
  });

  app.get("/api/resume", async (req, res) => {
    try {
      const resumePath = path.join(process.cwd(), "attached_assets", "Job_resume_1766001969964.pdf");
      
      if (!fs.existsSync(resumePath)) {
        return res.status(404).json({ error: "Resume not found" });
      }

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=Naseer_Ahmed_Resume.pdf");
      
      const fileStream = fs.createReadStream(resumePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error("Error serving resume:", error);
      return res.status(500).json({ error: "Failed to serve resume" });
    }
  });

  return httpServer;
}
