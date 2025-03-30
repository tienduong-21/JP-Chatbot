import dotenv from 'dotenv';
import { createApp } from './config/app';
import { logger } from './utils/logger';

// Load environment variables
dotenv.config();

// Check required environment variables
const apiKey = process.env.GEMINI_API_KEY;
const topicsDir = process.env.TOPICS_DIR || 'public/topics';
const port = process.env.PORT || 3000;

if (!apiKey) {
  logger.error('Error: GEMINI_API_KEY is not set in the .env file');
  logger.error('Please create a .env file with your Google Gemini API key');
  logger.error('Example: GEMINI_API_KEY=your_api_key_here');
  process.exit(1);
}

// Create the app
const app = createApp(apiKey, topicsDir);

// Start the server
app.listen(port, () => {
  logger.info(`🚀 API server running on port ${port}`);
  logger.info(`📚 Topics directory: ${topicsDir}`);
}); 