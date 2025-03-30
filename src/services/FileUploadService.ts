import fs from 'fs/promises';
import path from 'path';
import { logger } from '../utils/logger';
import { Topic } from '../models/Topic';
import { TopicService } from './TopicService';

export class FileUploadService {
  private topicService: TopicService;
  
  constructor(topicService: TopicService) {
    this.topicService = topicService;
  }
  
  /**
   * Process uploaded file and save as topic
   */
  async processTopicFile(
    file: Express.Multer.File, 
    customName?: string
  ): Promise<Topic> {
    try {
      // Read the file content
      const content = file.buffer.toString('utf-8');
      
      // Use custom name or original filename without extension
      const fileName = customName || path.basename(file.originalname, path.extname(file.originalname));
      
      // Save as a topic
      const topic = await this.topicService.saveTopic(fileName, content);
      
      return topic;
    } catch (error) {
      logger.error('Error processing topic file:', error);
      throw new Error('Failed to process topic file');
    }
  }
} 