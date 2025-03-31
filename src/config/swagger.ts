import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Japanese Chatbot API',
      version: '1.0.0',
      description: 'API documentation for the Japanese Chatbot application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Topic: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the topic',
            },
            name: {
              type: 'string',
              description: 'Display name of the topic',
            },
            summary: {
              type: 'string',
              description: 'Brief summary of the topic',
            },
            content: {
              type: 'string',
              description: 'Detailed content of the topic',
            },
          },
          required: ['id', 'name'],
        },
        ChatMessage: {
          type: 'object',
          properties: {
            role: {
              type: 'string',
              enum: ['user', 'assistant'],
              description: 'Role of the message sender',
            },
            content: {
              type: 'string',
              description: 'Content of the message',
            },
          },
          required: ['role', 'content'],
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
            },
          },
          required: ['error'],
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

export const swaggerSpec = swaggerJsdoc(options); 