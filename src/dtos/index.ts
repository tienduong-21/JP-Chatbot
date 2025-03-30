/**
 * Data Transfer Objects for API requests and responses
 */

/**
 * DTO for topic responses
 */
export interface TopicDto {
  id: string;
  name: string;
  summary?: string;
  content?: string;
}

/**
 * DTO for creating a new topic
 */
export interface CreateTopicDto {
  name: string;
  content: string;
}

/**
 * DTO for creating a new session
 */
export interface CreateSessionDto {
  topicId: string;
}

/**
 * DTO for sending a message in a session
 */
export interface SendMessageDto {
  content: string;
}

/**
 * DTO for a chat message
 */
export interface ChatMessageDto {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * DTO for session response
 */
export interface SessionDto {
  sessionId: string;
  topic: {
    id: string;
    name: string;
  };
  messages: ChatMessageDto[];
}

/**
 * DTO for message response
 */
export interface MessageResponseDto {
  messages: ChatMessageDto[];
}

/**
 * DTO for error response
 */
export interface ErrorResponseDto {
  error: string;
} 