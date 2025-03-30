import { ChatMessage } from '../types';
import { Session } from '../models/Session';
import { Topic } from '../models/Topic';
import { AIService } from './AIService';
import { logger } from '../utils/logger';

export class SessionService {
  private sessions: Map<string, Session>;
  private aiService: AIService;
  
  constructor(aiService: AIService) {
    this.sessions = new Map<string, Session>();
    this.aiService = aiService;
  }
  
  /**
   * Create a new session with the given topic
   */
  async createSession(topic: Topic): Promise<Session> {
    try {
      // Generate a unique session ID
      const sessionId = Date.now().toString();
      
      // Get initial message from AI
      const welcomeMessage = await this.aiService.startChat(topic);
      
      // Create initial message
      const initialMessage: ChatMessage = {
        role: 'assistant',
        content: welcomeMessage
      };
      
      // Create and store the new session
      const session = new Session(sessionId, topic, initialMessage);
      this.sessions.set(sessionId, session);
      
      return session;
    } catch (error) {
      logger.error('Error creating session:', error);
      throw new Error('Failed to create chat session');
    }
  }
  
  /**
   * Get a session by ID
   */
  getSession(sessionId: string): Session | undefined {
    return this.sessions.get(sessionId);
  }
  
  /**
   * Send a message in a session
   */
  async sendMessage(sessionId: string, content: string): Promise<ChatMessage[]> {
    try {
      const session = this.sessions.get(sessionId);
      console.log("session", session);
      
      if (!session) {
        throw new Error('Session not found');
      }
      
      // Add user message to session
      const userMessage: ChatMessage = {
        role: 'user',
        content
      };
      
      session.addMessage(userMessage);
      
      // Get AI response
      const aiResponse = await this.aiService.sendMessage(
        session.topic,
        session.getMessages()
      );
      
      // Add AI response to session
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: aiResponse
      };
      
      session.addMessage(assistantMessage);
      
      // Return the new messages
      return [userMessage, assistantMessage];
    } catch (error) {
      logger.error('Error sending message:', error);
      throw new Error('Failed to process message');
    }
  }
  
  /**
   * Delete a session
   */
  deleteSession(sessionId: string): boolean {
    return this.sessions.delete(sessionId);
  }
} 