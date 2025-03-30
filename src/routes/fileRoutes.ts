import { Router } from 'express';
import multer from 'multer';
import { FileUploadController } from '../controllers/FileUploadController';

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export function createFileRoutes(fileUploadController: FileUploadController): Router {
  const router = Router();
  
  // POST /files/topics - Upload a topic file
  router.post('/topics', upload.single('topic'), (req, res) => 
    fileUploadController.uploadTopicFile(req, res)
  );
  
  return router;
} 