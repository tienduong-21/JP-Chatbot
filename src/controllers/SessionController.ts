import { Request, Response } from 'express';
import { SessionService } from '../services/SessionService';
import { TopicService } from '../services/TopicService';
import { logger } from '../utils/logger';
import { CreateSessionDto, SendMessageDto, SessionDto, MessageResponseDto, ErrorResponseDto } from '../dtos';

export class SessionController {
  private sessionService: SessionService;
  private topicService: TopicService;
  
  constructor(sessionService: SessionService, topicService: TopicService) {
    this.sessionService = sessionService;
    this.topicService = topicService;
  }
  
  /**
   * Create a new session with a topic
   */
  async createSession(req: Request, res: Response): Promise<void> {
    try {
      const { topicId } = req.body as CreateSessionDto;
      
      if (!topicId) {
        const errorResponse: ErrorResponseDto = { error: 'Topic ID is required' };
        res.status(400).json(errorResponse);
        return;
      }
      
      const topic = await this.topicService.getTopicByName(topicId);
      
      if (!topic) {
        const errorResponse: ErrorResponseDto = { error: 'Topic not found' };
        res.status(404).json(errorResponse);
        return;
      }
      
      const session = await this.sessionService.createSession(topic);
      
      const sessionDto: SessionDto = session.toJSON();
      res.status(201).json(sessionDto);
    } catch (error) {
      logger.error('Error in createSession controller:', error);
      const errorResponse: ErrorResponseDto = { error: 'Failed to create session' };
      res.status(500).json(errorResponse);
    }
  }
  
  /**
   * Get a session by ID
   */
  async getSession(req: Request, res: Response): Promise<void> {
    try {
      const { sessionId } = req.params;
      const session = this.sessionService.getSession(sessionId);
      
      if (!session) {
        const errorResponse: ErrorResponseDto = { error: 'Session not found' };
        res.status(404).json(errorResponse);
        return;
      }
      
      const sessionDto: SessionDto = session.toJSON();
      res.json(sessionDto);
    } catch (error) {
      logger.error(`Error in getSession controller for ${req.params.sessionId}:`, error);
      const errorResponse: ErrorResponseDto = { error: 'Failed to get session' };
      res.status(500).json(errorResponse);
    }
  }
  
  /**
   * Send a message in a session
   */
  async sendMessage(req: Request, res: Response): Promise<void> {
    try {
      console.log("sessionId", req.params);
      console.log("content", req.body);
      const { sessionId } = req.params;
      const { content } = req.body as SendMessageDto;
      
      if (!content) {
        const errorResponse: ErrorResponseDto = { error: 'Message content is required' };
        res.status(400).json(errorResponse);
        return;
      }
      
      const messages = await this.sessionService.sendMessage(sessionId, content);
      
      const messageResponse: MessageResponseDto = { messages };
      res.json(messageResponse);
    } catch (error: unknown) {
      logger.error(`Error in sendMessage controller for ${req.params.sessionId}:`, error);
      
      // Check if error is an object with a message property
      if (error instanceof Error && error.message === 'Session not found') {
        const errorResponse: ErrorResponseDto = { error: 'Session not found' };
        res.status(404).json(errorResponse);
      } else {
        const errorResponse: ErrorResponseDto = { error: 'Failed to process message' + error };
        res.status(500).json(errorResponse);
      }
    }
  }
  
  /**
   * Delete a session
   */
  async deleteSession(req: Request, res: Response): Promise<void> {
    try {
      const { sessionId } = req.params;
      const deleted = this.sessionService.deleteSession(sessionId);
      
      if (!deleted) {
        const errorResponse: ErrorResponseDto = { error: 'Session not found' };
        res.status(404).json(errorResponse);
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      logger.error(`Error in deleteSession controller for ${req.params.sessionId}:`, error);
      const errorResponse: ErrorResponseDto = { error: 'Failed to delete session' };
      res.status(500).json(errorResponse);
    }
  }
} 