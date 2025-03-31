import { Request, Response } from 'express';
import { SessionService } from '../services/SessionService';
import { TopicService } from '../services/TopicService';
import { logger } from '../utils/logger';
import { StartChatDto, SendMessageDto, MessageResponseDto, ErrorResponseDto } from '../dtos';

export class SessionController {
  private sessionService: SessionService;
  private topicService: TopicService;
  
  constructor(sessionService: SessionService, topicService: TopicService) {
    this.sessionService = sessionService;
    this.topicService = topicService;
  }
  
  /**
   * Start a new chat with a topic
   */
  async startChat(req: Request, res: Response): Promise<void> {
    try {
      const { topicId } = req.body as StartChatDto;
      
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
      
      const messages = await this.sessionService.startChat(topic);
      
      const messageResponse: MessageResponseDto = { messages };
      res.status(200).json(messageResponse);
    } catch (error) {
      logger.error('Error in startChat controller:', error);
      const errorResponse: ErrorResponseDto = { error: 'Failed to start chat' };
      res.status(500).json(errorResponse);
    }
  }
  
  /**
   * Send a message and get AI response
   */
  async sendMessage(req: Request, res: Response): Promise<void> {
    try {
      const { topicId, messages, content } = req.body as SendMessageDto;
      
      if (!topicId || !content) {
        const errorResponse: ErrorResponseDto = { error: 'Topic ID and message content are required' };
        res.status(400).json(errorResponse);
        return;
      }
      
      const topic = await this.topicService.getTopicByName(topicId);
      
      if (!topic) {
        const errorResponse: ErrorResponseDto = { error: 'Topic not found' };
        res.status(404).json(errorResponse);
        return;
      }
      
      const newMessages = await this.sessionService.sendMessage(topic, messages || [], content);
      
      const messageResponse: MessageResponseDto = { messages: newMessages };
      res.json(messageResponse);
    } catch (error) {
      logger.error('Error in sendMessage controller:', error);
      const errorResponse: ErrorResponseDto = { error: 'Failed to process message' };
      res.status(500).json(errorResponse);
    }
  }
} 