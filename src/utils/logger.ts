/**
 * Simple logger utility with different log levels
 */
import dotenv from 'dotenv';

dotenv.config();

// Log levels enum
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4
}

// Parse log level from environment variable
function getLogLevelFromEnv(): LogLevel {
  const envLogLevel = process.env.LOG_LEVEL?.toUpperCase();
  
  if (!envLogLevel) {
    return LogLevel.INFO; // Default level
  }
  
  switch (envLogLevel) {
    case 'DEBUG':
      return LogLevel.DEBUG;
    case 'INFO':
      return LogLevel.INFO;
    case 'WARN':
      return LogLevel.WARN;
    case 'ERROR':
      return LogLevel.ERROR;
    case 'NONE':
      return LogLevel.NONE;
    default:
      return LogLevel.INFO;
  }
}

// Current log level (can be changed at runtime)
let currentLogLevel = getLogLevelFromEnv();

/**
 * Set the log level
 * @param level The log level to set
 */
export function setLogLevel(level: LogLevel): void {
  currentLogLevel = level;
}

/**
 * Get the current log level
 */
export function getLogLevel(): LogLevel {
  return currentLogLevel;
}

/**
 * Logger class with different log levels
 */
export const logger = {
  /**
   * Log debug message
   * @param message The message to log
   * @param optionalParams Additional parameters
   */
  debug: (message: string, ...optionalParams: any[]): void => {
    if (currentLogLevel <= LogLevel.DEBUG) {
      console.log(`[DEBUG] ${message}`, ...optionalParams);
    }
  },

  /**
   * Log info message
   * @param message The message to log
   * @param optionalParams Additional parameters
   */
  info: (message: string, ...optionalParams: any[]): void => {
    if (currentLogLevel <= LogLevel.INFO) {
      console.log(`[INFO] ${message}`, ...optionalParams);
    }
  },

  /**
   * Log warning message
   * @param message The message to log
   * @param optionalParams Additional parameters
   */
  warn: (message: string, ...optionalParams: any[]): void => {
    if (currentLogLevel <= LogLevel.WARN) {
      console.warn(`[WARN] ${message}`, ...optionalParams);
    }
  },

  /**
   * Log error message
   * @param message The message to log
   * @param optionalParams Additional parameters
   */
  error: (message: string, ...optionalParams: any[]): void => {
    if (currentLogLevel <= LogLevel.ERROR) {
      console.error(`[ERROR] ${message}`, ...optionalParams);
    }
  }
}; 