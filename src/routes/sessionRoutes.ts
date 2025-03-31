import { Router } from 'express';
import { SessionController } from '../controllers/SessionController';

/**
 * @swagger
 * /api/chat/start:
 *   post:
 *     summary: Start a new chat session
 *     description: Initializes a new chat session with the selected topic
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topicId:
 *                 type: string
 *                 description: ID of the selected topic
 *             required:
 *               - topicId
 *     responses:
 *       200:
 *         description: Chat session started successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ChatMessage'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Topic not found
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
/**
 * @swagger
 * /api/chat/message:
 *   post:
 *     summary: Send a message in the current chat session
 *     description: Sends a message and receives the AI's response
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topicId:
 *                 type: string
 *                 description: ID of the current topic
 *               messages:
 *                 type: array
 *                 description: Previous messages in the conversation
 *                 items:
 *                   $ref: '#/components/schemas/ChatMessage'
 *               content:
 *                 type: string
 *                 description: The message content to send
 *             required:
 *               - topicId
 *               - content
 *     responses:
 *       200:
 *         description: Message processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ChatMessage'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Topic not found
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
export function createSessionRoutes(sessionController: SessionController): Router {
  const router = Router();
  
  // POST /chat/start - Start a new chat
  router.post('/start', (req, res) => sessionController.startChat(req, res));
  
  // POST /chat/message - Send a message
  router.post('/message', (req, res) => sessionController.sendMessage(req, res));
  
  return router;
} 