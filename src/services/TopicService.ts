import fs from 'fs/promises';
import path from 'path';
import { Topic } from '../models/Topic';
import { logger } from '../utils/logger';

export class TopicService {
  private topicsDir: string;
  
  constructor(topicsDir: string = 'public/topics') {
    this.topicsDir = path.resolve(topicsDir);
    logger.info(`TopicService initialized with topics directory: ${this.topicsDir}`);
  }
  
  /**
   * Get all available topics
   */
  async getAllTopics(): Promise<Topic[]> {
    try {
      logger.info(`Reading topics from directory: ${this.topicsDir}`);
      await fs.mkdir(this.topicsDir, { recursive: true });
      const files = await fs.readdir(this.topicsDir);
      logger.info(`Found ${files.length} files in topics directory: ${files.join(', ')}`);
      
      const topicFiles = files.filter(file => file.endsWith('.txt'));
      logger.info(`Found ${topicFiles.length} topic files: ${topicFiles.join(', ')}`);
      
      const topics: Topic[] = [];
      for (const file of topicFiles) {
        const topicName = path.basename(file, '.txt');
        logger.info(`Processing topic file: ${file} with name: ${topicName}`);
        const topic = await this.getTopicByName(topicName);
        if (topic) {
          logger.info(`Successfully loaded topic: ${topicName}`);
          topics.push(topic);
        }
      }
      
      logger.info(`Returning ${topics.length} topics`);
      return topics;
    } catch (error) {
      logger.error('Error getting topics:', error);
      throw new Error('Failed to retrieve topics');
    }
  }
  
  /**
   * Get a topic by name
   */
  async getTopicByName(name: string): Promise<Topic | null> {
    try {
      const filePath = path.join(this.topicsDir, `${name}.txt`);
      logger.info(`Reading topic file: ${filePath}`);
      const content = await fs.readFile(filePath, 'utf-8');
      logger.info(`Successfully read topic file: ${name} with content length: ${content.length}`);
      return new Topic(name, content);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        logger.warn(`Topic file not found: ${name}`);
        return null;
      }
      logger.error(`Error reading topic ${name}:`, error);
      throw new Error(`Failed to read topic: ${name}`);
    }
  }
  
  /**
   * Save a new topic
   */
  async saveTopic(name: string, content: string): Promise<Topic> {
    try {
      await fs.mkdir(this.topicsDir, { recursive: true });
      const filePath = path.join(this.topicsDir, `${name}.txt`);
      await fs.writeFile(filePath, content, 'utf-8');
      
      return new Topic(name, content);
    } catch (error) {
      logger.error(`Error saving topic ${name}:`, error);
      throw new Error(`Failed to save topic: ${name}`);
    }
  }
  
  /**
   * Delete a topic
   */
  async deleteTopic(name: string): Promise<boolean> {
    try {
      const filePath = path.join(this.topicsDir, `${name}.txt`);
      await fs.unlink(filePath);
      return true;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return false;
      }
      logger.error(`Error deleting topic ${name}:`, error);
      throw new Error(`Failed to delete topic: ${name}`);
    }
  }
} 