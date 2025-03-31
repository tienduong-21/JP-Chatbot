import { Router } from 'express';
import { SessionController } from '../controllers/SessionController';

export function createSessionRoutes(sessionController: SessionController): Router {
  const router = Router();
  
  // POST /chat/start - Start a new chat
  router.post('/start', (req, res) => sessionController.startChat(req, res));
  
  // POST /chat/message - Send a message
  router.post('/message', (req, res) => sessionController.sendMessage(req, res));
  
  return router;
} 