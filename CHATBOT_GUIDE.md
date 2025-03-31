# Japanese Chatbot Guide

## Overview
This chatbot is designed to provide information and assistance in Japanese, using English content as its knowledge base. The chatbot can handle both English and Japanese inputs, providing responses in Japanese while maintaining context from the conversation.

## Features
- Bilingual support (English input, Japanese output)
- Topic-based conversations
- Stateless chat implementation (no session storage)
- Real-time responses using Google's Gemini AI
- Topic management system

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Google Gemini API key

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   PORT=3000
   ```

### Running the Application
1. Build the TypeScript code:
   ```bash
   npm run build
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3000`

## Using the Chatbot

### Starting a Conversation
1. Select a topic from the dropdown menu
2. Click "Start Chat" to begin a conversation
3. The chatbot will greet you in Japanese and provide information about the selected topic

### Chatting with the Bot
- Type your message in English or Japanese
- Press Enter or click "Send" to send your message
- The bot will respond in Japanese
- Each response is based on the selected topic and conversation context

### Available Topics
The chatbot comes with pre-defined topics in the `public/topics` directory:
- How to Login
- How to Register
- How to Change Password

### Conversation Flow
1. The conversation starts with a welcome message in Japanese
2. Each user message is processed in real-time
3. The bot maintains context within the current conversation
4. When you close the tab or refresh the page, a new conversation will start

## Technical Details

### Architecture
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js with Express
- AI: Google Gemini API
- Storage: File-based topic storage

### API Endpoints
- `GET /api/topics` - Get all available topics
- `POST /api/chat/start` - Start a new chat with a topic
- `POST /api/chat/message` - Send a message and get AI response

### Topic Management
Topics are stored as text files in the `public/topics` directory:
- Each topic is a `.txt` file
- File name becomes the topic ID
- Content is used as context for the AI

## Best Practices

### Writing Topics
1. Keep content clear and concise
2. Use simple English for better translation
3. Include relevant keywords
4. Structure content in a logical flow

### Using the Chatbot
1. Start with clear, specific questions
2. Stay within the selected topic
3. Allow the bot to complete its responses
4. Use natural language

## Troubleshooting

### Common Issues
1. No topics available
   - Check if the `public/topics` directory exists
   - Verify topic files are in the correct format
   - Check server logs for errors

2. API errors
   - Verify your API key is correct
   - Check internet connectivity
   - Review server logs for details

3. Response issues
   - Ensure you're using the correct topic
   - Check if the question is within the topic's scope
   - Try rephrasing your question

### Getting Help
- Check the server logs for detailed error messages
- Review the API documentation
- Contact support if issues persist

## Development

### Adding New Topics
1. Create a new `.txt` file in `public/topics`
2. Name the file appropriately (e.g., `new-topic.txt`)
3. Add content in English
4. Restart the server to load the new topic

### Customizing Responses
The chatbot uses the Google Gemini API with specific prompts to:
- Maintain Japanese responses
- Keep context from the conversation
- Provide accurate information based on topics

## Security Considerations
- API keys should be kept secure
- No sensitive information is stored
- Each conversation is stateless
- Input validation is performed on all requests

## Future Improvements
- Add more topics
- Implement user authentication
- Add conversation history
- Improve response accuracy
- Add support for more languages 