import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
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
import multer from 'multer';

export function createApp(apiKey: string, topicsDir: string = 'public/topics'): Express {
  const app = express();
  
  // Configure CORS
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
  app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
  // Configure rate limiting
  const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100')
  });
  app.use(limiter);
  
  // Configure middleware
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
  app.use('/api/chat', createSessionRoutes(sessionController));
  app.use('/api/files', createFileRoutes(fileUploadController));
  
  // Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
  // Configure file upload
  const uploadDir = process.env.UPLOAD_DIR || 'uploads';
  const upload = multer({ 
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadDir);
      },
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      }
    }),
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
  });
  
  // Add backward compatibility route for file uploads
  app.post('/api/upload/topic', upload.single('file'), (req, res) => {
    if (req.file) {
      req.file.fieldname = 'topic';
      fileUploadController.uploadTopicFile(req, res);
    } else {
      const errorResponse = { error: 'No file uploaded' };
      res.status(400).json(errorResponse);
    }
  });
  
  // Error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error('Unhandled error:', err);
    res.status(500).json({ error: 'An unexpected error occurred' });
  });
  
  return app;
} 