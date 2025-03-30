import { Router } from 'express';
import { TopicController } from '../controllers/TopicController';

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