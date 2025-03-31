import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from '../types';
import { Topic } from '../models/Topic';
import { logger } from '../utils/logger';

export class AIService {
  private ai: any;
  
  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('API_KEY is required for AIService');
    }
    this.ai = new GoogleGenAI({ apiKey });
  }
  
  /**
   * Start a new chat session with the selected topic
   */
  async startChat(topic: Topic): Promise<ChatMessage> {
    try {
      const prompt = `You are a bilingual AI assistant that can communicate in both English and Japanese.
Based on the following English topic information, please respond to user questions in the same language they use.
If the user writes in English, respond in English. If they write in Japanese, respond in Japanese.
Topic: ${topic.name}

English Information:
${topic.content}

Please follow these guidelines:
1. Detect the user's language and respond in the same language
2. For English responses:
   - Use clear, professional English
   - Keep explanations concise and easy to understand
   - Include technical terms when relevant
   - Use markdown formatting for better readability:
     * Use **bold** for emphasis
     * Use *italic* for secondary emphasis
     * Use \`code\` for technical terms
     * Use \`\`\` for code blocks
     * Use > for quotes
     * Use - or * for lists
     * Use # for headings
3. For Japanese responses:
   - Use polite, natural Japanese (です/ます form)
   - Translate English content naturally
   - Include English terms in parentheses when important
   - Use markdown formatting for better readability:
     * Use **太字** for emphasis
     * Use *斜体* for secondary emphasis
     * Use \`コード\` for technical terms
     * Use \`\`\` for code blocks
     * Use > for quotes
     * Use - or * for lists
     * Use # for headings
4. If you don't know the answer:
   - English: "I'm sorry, I don't have information about that."
   - Japanese: "すみません、その質問についての情報がありません"
5. Keep responses concise, aiming for 300 characters or less

First, greet the user in both languages and ask what they would like to know about this topic.`;

      const response = await this.ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt
      });
      
      return {
        role: 'assistant',
        content: response.text || "Hello! こんにちは！\nHow can I help you today? どのようなことについて知りたいですか？"
      };
    } catch (error) {
      logger.error('Error starting chat:', error);
      return {
        role: 'assistant',
        content: 'Sorry, I could not start the chat. Please try again.\nすみません、チャットを開始できませんでした。もう一度お試しください。'
      };
    }
  }

  /**
   * Send a message to the AI and get a response, preserving conversation history
   */
  async sendMessage(topic: Topic, messages: ChatMessage[]): Promise<ChatMessage> {
    try {
      // Get the latest user message
      const latestUserMessage = messages.filter(msg => msg.role === 'user').pop();
      
      if (!latestUserMessage) {
        return {
          role: 'assistant',
          content: 'メッセージが見つかりませんでした。'
        };
      }

      // Format the chat history for the AI
      const formattedHistory = this.formatChatHistory(messages, topic);
      
      // Send the prompt with history and get a response
      const response = await this.ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: formattedHistory
      });
      
      return {
        role: 'assistant',
        content: response.text || "すみません、回答を生成できませんでした。"
      };
    } catch (error) {
      logger.error('Error sending message to AI:', error);
      return {
        role: 'assistant',
        content: 'すみません、エラーが発生しました。もう一度お試しください。'
      };
    }
  }

  /**
   * Format chat history for the AI prompt
   */
  private formatChatHistory(messages: ChatMessage[], topic: Topic): string {
    // Context to give the AI about its role and the topic
    const systemContext = `You are a bilingual AI assistant that can communicate in both English and Japanese.
Based on the following English topic information, please respond to user questions in the same language they use.
If the user writes in English, respond in English. If they write in Japanese, respond in Japanese.
Topic: ${topic.name}

English Information:
${topic.content}

Please follow these guidelines:
1. Detect the user's language and respond in the same language
2. For English responses:
   - Use clear, professional English
   - Keep explanations concise and easy to understand
   - Include technical terms when relevant
   - Use markdown formatting for better readability:
     * Use **bold** for emphasis
     * Use *italic* for secondary emphasis
     * Use \`code\` for technical terms
     * Use \`\`\` for code blocks
     * Use > for quotes
     * Use - or * for lists
     * Use # for headings
3. For Japanese responses:
   - Use polite, natural Japanese (です/ます form)
   - Translate English content naturally
   - Include English terms in parentheses when important
   - Use markdown formatting for better readability:
     * Use **太字** for emphasis
     * Use *斜体* for secondary emphasis
     * Use \`コード\` for technical terms
     * Use \`\`\` for code blocks
     * Use > for quotes
     * Use - or * for lists
     * Use # for headings
4. If you don't know the answer:
   - English: "I'm sorry, I don't have information about that. Would you like to try a different topic?"
   - Japanese: "すみません、その質問についての情報がありません。別のトピックをお試しになりますか？"
5. Keep responses concise, aiming for 300 characters or less

Previous conversation:
${messages.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

Please respond to the latest message.`;

    return systemContext;
  }
} 