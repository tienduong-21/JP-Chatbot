import { ChatMessage } from '../types';
import { Topic } from './Topic';

/**
 * Session model representing a chat session
 */
export class Session {
  id: string;
  topic: Topic;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  
  constructor(id: string, topic: Topic, initialMessage?: ChatMessage) {
    this.id = id;
    this.topic = topic;
    this.messages = initialMessage ? [initialMessage] : [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  
  addMessage(message: ChatMessage): void {
    this.messages.push(message);
    this.updatedAt = new Date();
  }
  
  getMessages(): ChatMessage[] {
    return this.messages;
  }
  
  toJSON() {
    return {
      sessionId: this.id,
      topic: {
        id: this.topic.id,
        name: this.topic.name
      },
      messages: this.messages
    };
  }
} 