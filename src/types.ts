/**
 * Types used across the application
 */

/**
 * Chat message structure representing a single message in a conversation
 */
export interface ChatMessage {
  /**
   * Role of the message sender - either 'user' or 'assistant'
   */
  role: 'user' | 'assistant';
  
  /**
   * Content of the message
   */
  content: string;
} 