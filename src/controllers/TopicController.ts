import { Request, Response } from 'express';
import { TopicService } from '../services/TopicService';
import { logger } from '../utils/logger';
import { TopicDto, CreateTopicDto, ErrorResponseDto } from '../dtos';

export class TopicController {
  private topicService: TopicService;
  
  constructor(topicService: TopicService) {
    this.topicService = topicService;
  }
  
  /**
   * Get all topics
   */
  async getTopics(req: Request, res: Response): Promise<void> {
    try {
      const topics = await this.topicService.getAllTopics();
      
      const topicDtos: TopicDto[] = topics.map(topic => ({
        id: topic.id,
        name: topic.name,
        summary: topic.summary
      }));
      
      res.json(topicDtos);
    } catch (error) {
      logger.error('Error in getTopics controller:', error);
      const errorResponse: ErrorResponseDto = { error: 'Failed to fetch topics' };
      res.status(500).json(errorResponse);
    }
  }
  
  /**
   * Get a single topic by ID
   */
  async getTopic(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const topic = await this.topicService.getTopicByName(id);
      
      if (!topic) {
        const errorResponse: ErrorResponseDto = { error: 'Topic not found' };
        res.status(404).json(errorResponse);
        return;
      }
      
      const topicDto: TopicDto = {
        id: topic.id,
        name: topic.name,
        content: topic.content,
        summary: topic.summary
      };
      
      res.json(topicDto);
    } catch (error) {
      logger.error(`Error in getTopic controller for ${req.params.id}:`, error);
      const errorResponse: ErrorResponseDto = { error: 'Failed to fetch topic' };
      res.status(500).json(errorResponse);
    }
  }
  
  /**
   * Create a new topic
   */
  async createTopic(req: Request, res: Response): Promise<void> {
    try {
      const { name, content } = req.body as CreateTopicDto;
      
      if (!name || !content) {
        const errorResponse: ErrorResponseDto = { error: 'Name and content are required' };
        res.status(400).json(errorResponse);
        return;
      }
      
      const topic = await this.topicService.saveTopic(name, content);
      
      const topicDto: TopicDto = {
        id: topic.id,
        name: topic.name,
        summary: topic.summary
      };
      
      res.status(201).json(topicDto);
    } catch (error) {
      logger.error('Error in createTopic controller:', error);
      const errorResponse: ErrorResponseDto = { error: 'Failed to create topic' };
      res.status(500).json(errorResponse);
    }
  }
  
  /**
   * Delete a topic
   */
  async deleteTopic(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.topicService.deleteTopic(id);
      
      if (!deleted) {
        const errorResponse: ErrorResponseDto = { error: 'Topic not found' };
        res.status(404).json(errorResponse);
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      logger.error(`Error in deleteTopic controller for ${req.params.id}:`, error);
      const errorResponse: ErrorResponseDto = { error: 'Failed to delete topic' };
      res.status(500).json(errorResponse);
    }
  }
} 