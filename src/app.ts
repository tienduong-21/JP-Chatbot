import dotenv from 'dotenv';
import { createApp } from './config/app';
import { logger } from './utils/logger';
import fs from 'fs/promises';
import path from 'path';

// Load environment variables
dotenv.config();

// Check required environment variables
const apiKey = process.env.GEMINI_API_KEY;
const topicsDir = process.env.TOPICS_DIR || 'public/topics';
const port = parseInt(process.env.PORT || '3000');
const uploadDir = process.env.UPLOAD_DIR || 'uploads';

// Validate required environment variables
if (!apiKey) {
  logger.error('Error: GEMINI_API_KEY is not set in the .env file');
  logger.error('Please create a .env file with your Google Gemini API key');
  logger.error('Example: GEMINI_API_KEY=your_api_key_here');
  process.exit(1);
}

// Create required directories
async function createRequiredDirectories() {
  try {
    // Create topics directory if it doesn't exist
    await fs.mkdir(topicsDir, { recursive: true });
    logger.info(`Topics directory created/verified: ${topicsDir}`);
    
    // Create uploads directory if it doesn't exist
    await fs.mkdir(uploadDir, { recursive: true });
    logger.info(`Uploads directory created/verified: ${uploadDir}`);
  } catch (error) {
    logger.error('Error creating required directories:', error);
    process.exit(1);
  }
}

// Initialize the application
async function initializeApp() {
  await createRequiredDirectories();
  
  // Create the app
  const app = createApp(apiKey as string, topicsDir);
  
  // Start the server
  app.listen(port, () => {
    logger.info(`🚀 API server running on port ${port}`);
    logger.info(`📚 Topics directory: ${topicsDir}`);
    logger.info(`📁 Uploads directory: ${uploadDir}`);
    logger.info(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

// Start the application
initializeApp().catch(error => {
  logger.error('Failed to initialize application:', error);
  process.exit(1);
}); 