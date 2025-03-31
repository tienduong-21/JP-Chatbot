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
 * DTO for starting a new chat
 */
export interface StartChatDto {
  topicId: string;
}

/**
 * DTO for chat message
 */
export interface ChatMessageDto {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * DTO for sending a message
 */
export interface SendMessageDto {
  topicId: string;
  messages: ChatMessageDto[];
  content: string;
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