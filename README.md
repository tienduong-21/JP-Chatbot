# AI Chatbot Application

A modern web application that provides an AI-powered chatbot interface for answering questions about various topics.

## Features

- Interactive chat interface
- Topic-based knowledge system
- File upload support
- Markdown rendering
- Session management
- Responsive design

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Google Gemini API key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chatbot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```
GEMINI_API_KEY=your_api_key_here
PORT=3000
NODE_ENV=development
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Building for Production

1. Build the TypeScript files:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Testing

Run tests:
```bash
npm test
```

Watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## Code Quality

- Lint code:
```bash
npm run lint
```

- Format code:
```bash
npm run format
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── dtos/          # Data Transfer Objects
├── models/        # Data models
├── routes/        # API routes
├── services/      # Business logic
├── topics/        # Topic content
├── utils/         # Utility functions
├── app.ts         # Application entry point
└── types.ts       # TypeScript type definitions
```

## License

MIT

## Documentation

- `API_DOCS.md`: Detailed API documentation
- `API_IMPLEMENTATION.md`: Implementation guide
- `CHATBOT_GUIDE.md`: Comprehensive guide for users

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Google Gemini API for providing AI capabilities
- Node.js and TypeScript communities 