import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { createTopicRoutes } from '../routes/topicRoutes';
import { createSessionRoutes } from '../routes/sessionRoutes';
import { createFileRoutes } from '../routes/fileRoutes';
import { TopicService } from '../services/TopicService';
import { AIService } from '../services/AIService';
import { SessionService } from '../services/SessionService';
import { FileUploadService } from '../services/FileUploadService';
import { TopicController } from '../controllers/TopicController';
import { SessionController } from '../controllers/SessionController';
import { FileUploadController } from '../controllers/FileUploadController';
import { logger } from '../utils/logger';

export function createApp(apiKey: string, topicsDir: string = 'public/topics'): Express {
  const app = express();
  
  // Configure middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.static('public'));
  
  // Add request logging
  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.debug(`${req.method} ${req.url}`);
    next();
  });
  
  // Initialize services
  const topicService = new TopicService(topicsDir);
  const aiService = new AIService(apiKey);
  const sessionService = new SessionService(aiService);
  const fileUploadService = new FileUploadService(topicService);
  
  // Initialize controllers
  const topicController = new TopicController(topicService);
  const sessionController = new SessionController(sessionService, topicService);
  const fileUploadController = new FileUploadController(fileUploadService);
  
  // Configure routes
  app.use('/api/topics', createTopicRoutes(topicController));
  app.use('/api/sessions', createSessionRoutes(sessionController));
  app.use('/api/files', createFileRoutes(fileUploadController));
  
  // Error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error('Unhandled error:', err);
    res.status(500).json({ error: 'An unexpected error occurred' });
  });
  
  return app;
} 