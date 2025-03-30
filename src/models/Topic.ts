/**
 * Topic model representing a chat topic
 */
export class Topic {
  id: string;
  name: string;
  content: string;
  summary?: string;
  
  constructor(name: string, content: string) {
    this.id = name;
    this.name = name;
    this.content = content;
    this.summary = this.generateSummary();
  }
  
  /**
   * Generate a summary from the content
   * Takes the first sentence or up to 100 characters
   */
  private generateSummary(): string {
    // Get first sentence or first 100 chars
    const firstSentence = this.content.split(/[。.!?！？]/)[0].trim();
    return firstSentence.length > 100 
      ? firstSentence.substring(0, 97) + '...' 
      : firstSentence;
  }
} 