# Japanese Chatbot with API and Conversation History

A modern conversational AI chatbot built with TypeScript, Express, and Google Gemini API. This application supports Japanese language learning through topic-based conversations with persistent chat history.

## Features

- **Japanese Language Chatbot** using Google Gemini AI
- **MVC Architecture** for clean code organization
- **RESTful API** with comprehensive endpoints
- **Conversation History Support** for contextual responses
- **Topic-Based Learning** with sample topics included
- **Web Interface** for easy interaction
- **File Upload** for adding custom topics
- **Structured DTOs** for consistent data exchange
- **Client-Side Examples** for integration

## Prerequisites

- Node.js 14+
- npm or yarn
- Google Gemini API key

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/japanese-chatbot.git
   cd japanese-chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   GEMINI_API_KEY=your_api_key_here
   PORT=3000 # Optional, defaults to 3000
   ```

## Usage

### Running the API Server

Start the API server:

```bash
npm run api
```

For development with auto-restart:

```bash
npm run api:dev
```

### Web Interface

Once the server is running, access the web interface at:

```
http://localhost:3000
```

### File Upload Interface

To add new topic files, use the upload interface:

```
http://localhost:3000/upload.html
```

### Using the API

The API provides endpoints for:

- Getting available topics
- Starting chat sessions
- Sending and receiving messages
- Viewing conversation history
- Managing sessions

See the `API_DOCS.md` for complete API documentation.

### Client Application

Run the example client:

```bash
node client-example.js
```

## Project Structure

```
├── public/                    # Static assets and client-side code
│   ├── index.html             # Web chat interface
│   ├── upload.html            # Topic upload interface
│   └── topics/                # Topic files
│       ├── tokyo.txt          # Sample topic: Tokyo
│       └── kyoto.txt          # Sample topic: Kyoto
├── src/                       # Server-side TypeScript code
│   ├── config/                # App configuration
│   ├── controllers/           # API controllers
│   ├── dtos/                  # Data Transfer Objects
│   ├── models/                # Data models
│   ├── routes/                # API routes
│   ├── services/              # Business logic
│   ├── utils/                 # Utilities
│   └── app.ts                 # Main application entry point
├── .env                       # Environment variables
├── package.json               # Project dependencies
└── tsconfig.json              # TypeScript configuration
```

## Documentation

- `API_DOCS.md`: Detailed API documentation
- `API_IMPLEMENTATION.md`: Implementation guide
- `CHATBOT_GUIDE.md`: Comprehensive guide for users

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Acknowledgments

- Google Gemini API for providing AI capabilities
- Node.js and TypeScript communities 