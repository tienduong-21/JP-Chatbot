import { ChatMessage } from '../types';
import { Topic } from '../models/Topic';
import { AIService } from './AIService';
import { logger } from '../utils/logger';

export class SessionService {
  private aiService: AIService;
  
  constructor(aiService: AIService) {
    this.aiService = aiService;
  }
  
  /**
   * Start a new chat with the given topic
   */
  async startChat(topic: Topic): Promise<ChatMessage[]> {
    try {
      // Get initial message from AI
      const welcomeMessage = await this.aiService.startChat(topic);
      
      // Return initial message
      return [welcomeMessage];
    } catch (error) {
      logger.error('Error starting chat:', error);
      throw new Error('Failed to start chat');
    }
  }
  
  /**
   * Send a message and get AI response
   */
  async sendMessage(topic: Topic, messages: ChatMessage[], content: string): Promise<ChatMessage[]> {
    try {
      // Add user message
      const userMessage: ChatMessage = {
        role: 'user',
        content
      };
      
      // Get AI response with conversation history
      const aiResponse = await this.aiService.sendMessage(topic, [...messages, userMessage]);
      
      // Return both messages
      return [
        userMessage,
        aiResponse
      ];
    } catch (error) {
      logger.error('Error sending message:', error);
      throw new Error('Failed to process message');
    }
  }
} 