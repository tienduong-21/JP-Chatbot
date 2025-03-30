import { Request, Response } from 'express';
import { FileUploadService } from '../services/FileUploadService';
import { logger } from '../utils/logger';
import { TopicDto, ErrorResponseDto } from '../dtos';

// Additional DTO for file upload response
interface FileUploadResponseDto extends TopicDto {
  message: string;
}

export class FileUploadController {
  private fileUploadService: FileUploadService;
  
  constructor(fileUploadService: FileUploadService) {
    this.fileUploadService = fileUploadService;
  }
  
  /**
   * Upload a topic file
   */
  async uploadTopicFile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        const errorResponse: ErrorResponseDto = { error: 'No file uploaded' };
        res.status(400).json(errorResponse);
        return;
      }
      
      const customName = req.body.name;
      const topic = await this.fileUploadService.processTopicFile(req.file, customName);
      
      const responseDto: FileUploadResponseDto = {
        id: topic.id,
        name: topic.name,
        summary: topic.summary,
        message: 'Topic file uploaded successfully'
      };
      
      res.status(201).json(responseDto);
    } catch (error) {
      logger.error('Error in uploadTopicFile controller:', error);
      const errorResponse: ErrorResponseDto = { error: 'Failed to upload topic file' };
      res.status(500).json(errorResponse);
    }
  }
} 