import { Router } from 'express';
import { SessionController } from '../controllers/SessionController';

export function createSessionRoutes(sessionController: SessionController): Router {
  const router = Router();
  
  // POST /sessions - Create a new session
  router.post('/', (req, res) => sessionController.createSession(req, res));
  
  // GET /sessions/:sessionId - Get a specific session
  router.get('/:sessionId', (req, res) => sessionController.getSession(req, res));
  
  // POST /sessions/:sessionId/messages - Send a message in a session
  router.post('/:sessionId/messages', (req, res) => sessionController.sendMessage(req, res));
  
  // DELETE /sessions/:sessionId - Delete a session
  router.delete('/:sessionId', (req, res) => sessionController.deleteSession(req, res));
  
  return router;
} 