import { Router } from 'express';
import { TopicController } from '../controllers/TopicController';

/**
 * @swagger
 * /api/topics:
 *   get:
 *     summary: Get all available topics
 *     description: Returns a list of all topics without their detailed content
 *     tags: [Topics]
 *     responses:
 *       200:
 *         description: List of topics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Topic'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Create a new topic
 *     description: Creates a new topic with the provided information
 *     tags: [Topics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Display name of the topic
 *               content:
 *                 type: string
 *                 description: Detailed content of the topic
 *             required:
 *               - name
 *               - content
 *     responses:
 *       201:
 *         description: Topic created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       400:
 *         description: Invalid request
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
 * /api/topics/{id}:
 *   get:
 *     summary: Get a specific topic
 *     description: Returns detailed information about a specific topic
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic ID
 *     responses:
 *       200:
 *         description: Topic details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
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
 *   delete:
 *     summary: Delete a topic
 *     description: Removes a topic from the system
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic ID
 *     responses:
 *       200:
 *         description: Topic deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
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
export function createTopicRoutes(topicController: TopicController): Router {
  const router = Router();
  
  // GET /topics - Get all topics
  router.get('/', (req, res) => topicController.getTopics(req, res));
  
  // GET /topics/:id - Get a specific topic
  router.get('/:id', (req, res) => topicController.getTopic(req, res));
  
  // POST /topics - Create a new topic
  router.post('/', (req, res) => topicController.createTopic(req, res));
  
  // DELETE /topics/:id - Delete a topic
  router.delete('/:id', (req, res) => topicController.deleteTopic(req, res));
  
  return router;
} 