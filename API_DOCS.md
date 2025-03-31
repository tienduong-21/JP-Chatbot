# Japanese Chatbot API Documentation

This document provides detailed information about the Japanese Chatbot API endpoints, request/response formats, and usage examples.

## Base URL

All API endpoints are accessed from the base URL:

```
http://localhost:3000/api
```

## Data Transfer Objects (DTOs)

The API uses standard DTOs for consistent data exchange:

### Topic DTOs

```typescript
// Topic response
interface TopicDto {
  id: string;
  name: string;
  summary?: string;
  content?: string;
}

// For creating a new topic
interface CreateTopicDto {
  name: string;
  content: string;
}
```

### Session DTOs

```typescript
// For creating a new session
interface CreateSessionDto {
  topicId: string;
}

// For sending a message
interface SendMessageDto {
  content: string;
}

// Chat message format
interface ChatMessageDto {
  role: 'user' | 'assistant';
  content: string;
}

// Session response
interface SessionDto {
  sessionId: string;
  topic: {
    id: string;
    name: string;
  };
  messages: ChatMessageDto[];
}

// Message response
interface MessageResponseDto {
  messages: ChatMessageDto[];
}
```

### Error DTO

```typescript
interface ErrorResponseDto {
  error: string;
}
```

## API Endpoints

### Topics

#### Get All Topics

Returns a list of all available topics.

- **URL**: `/topics`
- **Method**: `GET`
- **Response**: Array of `TopicDto` objects (without content field)

Example Response:
```json
[
  {
    "id": "tokyo",
    "name": "Tokyo",
    "summary": "Information about Tokyo, the capital of Japan"
  },
  {
    "id": "kyoto",
    "name": "Kyoto",
    "summary": "Information about Kyoto, the former capital of Japan"
  }
]
```

#### Get Topic by ID

Returns details about a specific topic, including its content.

- **URL**: `/topics/:id`
- **Method**: `GET`
- **URL Params**: `id=[string]` (topic identifier)
- **Response**: `TopicDto` object (with content field)

Example Response:
```json
{
  "id": "tokyo",
  "name": "Tokyo",
  "summary": "Information about Tokyo, the capital of Japan",
  "content": "東京は日本の首都であり、世界最大の都市圏の一つです。..."
}
```

#### Create Topic

Creates a new topic.

- **URL**: `/topics`
- **Method**: `POST`
- **Body**: `CreateTopicDto`
- **Response**: Created `TopicDto` object

Example Request:
```json
{
  "name": "Osaka",
  "content": "大阪は日本の第二の都市であり、関西地方の中心都市です。..."
}
```

Example Response:
```json
{
  "id": "osaka",
  "name": "Osaka",
  "summary": "大阪は日本の第二の都市であり、関西地方の中心都市です。"
}
```

#### Delete Topic

Deletes a topic.

- **URL**: `/topics/:id`
- **Method**: `DELETE`
- **URL Params**: `id=[string]` (topic identifier)
- **Response**: Status 204 (No Content) on success

### Sessions

#### Create Session

Creates a new chat session with a specified topic.

- **URL**: `/sessions`
- **Method**: `POST`
- **Body**: `CreateSessionDto`
- **Response**: `SessionDto` object

Example Request:
```json
{
  "topicId": "tokyo"
}
```

Example Response:
```json
{
  "sessionId": "session_1234567890",
  "topic": {
    "id": "tokyo",
    "name": "Tokyo"
  },
  "messages": [
    {
      "role": "assistant",
      "content": "こんにちは！東京について何か知りたいことがありますか？東京は日本の首都で、多くの観光スポットがあります。"
    }
  ]
}
```

#### Get Session

Retrieves a specific session and its conversation history.

- **URL**: `/sessions/:sessionId`
- **Method**: `GET`
- **URL Params**: `sessionId=[string]` (session identifier)
- **Response**: `SessionDto` object

Example Response:
```json
{
  "sessionId": "session_1234567890",
  "topic": {
    "id": "tokyo",
    "name": "Tokyo"
  },
  "messages": [
    {
      "role": "assistant",
      "content": "こんにちは！東京について何か知りたいことがありますか？"
    },
    {
      "role": "user",
      "content": "東京の人口は？"
    },
    {
      "role": "assistant",
      "content": "東京の人口は約1,400万人で、都市圏では約3,700万人です。"
    }
  ]
}
```

#### Send Message

Sends a message in a session and returns the updated conversation.

- **URL**: `/sessions/:sessionId/messages`
- **Method**: `POST`
- **URL Params**: `sessionId=[string]` (session identifier)
- **Body**: `SendMessageDto`
- **Response**: `MessageResponseDto` object

Example Request:
```json
{
  "content": "東京の有名な観光スポットは？"
}
```

Example Response:
```json
{
  "messages": [
    {
      "role": "user",
      "content": "東京の有名な観光スポットは？"
    },
    {
      "role": "assistant",
      "content": "東京の有名な観光スポットには東京スカイツリー、東京タワー、浅草寺、明治神宮、渋谷スクランブル交差点、秋葉原、銀座、上野公園などがあります。"
    }
  ]
}
```

#### Delete Session

Deletes a session.

- **URL**: `/sessions/:sessionId`
- **Method**: `DELETE`
- **URL Params**: `sessionId=[string]` (session identifier)
- **Response**: Status 204 (No Content) on success

### File Upload

#### Upload Topic File

Uploads a file to create a new topic.

- **URL**: `/upload/topic`
- **Method**: `POST`
- **Body**: `multipart/form-data` with fields:
  - `file`: Text file containing the topic content
  - `name` (optional): Custom name for the topic
- **Response**: Topic object with upload status

Example Response:
```json
{
  "id": "hiroshima",
  "name": "Hiroshima",
  "summary": "広島は日本の西部に位置する都市で...",
  "message": "Topic file uploaded successfully"
}
```

## Error Handling

All endpoints return appropriate HTTP status codes and error messages:

- `400 Bad Request`: Missing or invalid parameters
- `404 Not Found`: Requested resource not found
- `500 Internal Server Error`: Server-side errors

Example Error Response:
```json
{
  "error": "Session not found"
}
```

## Rate Limiting

The API currently does not implement rate limiting, but it's recommended to limit requests to 60 per minute per client.

## Authentication

The API currently does not require authentication. For production use, consider implementing API keys or OAuth2.

## Example Usage Flow

1. Get available topics
2. Create a session with a selected topic
3. Send messages and receive responses
4. View the complete conversation history
5. Delete the session when finished 