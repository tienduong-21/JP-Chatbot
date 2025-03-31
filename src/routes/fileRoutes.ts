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

/**
 * @swagger
 * /api/files/topics:
 *   post:
 *     summary: Upload a new topic file
 *     description: Uploads a text file containing topic information. The file should be sent as form-data with the field name 'topic'.
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               topic:
 *                 type: string
 *                 format: binary
 *                 description: Text file containing topic information
 *             required:
 *               - topic
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 topic:
 *                   $ref: '#/components/schemas/Topic'
 *       400:
 *         description: Invalid request or file format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export function createFileRoutes(fileUploadController: FileUploadController): Router {
  const router = Router();
  
  // POST /files/topics - Upload a topic file
  router.post('/topics', upload.single('topic'), (req, res) => 
    fileUploadController.uploadTopicFile(req, res)
  );
  
  return router;
} 