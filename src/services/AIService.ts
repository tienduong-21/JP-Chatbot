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
  async startChat(topic: Topic): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `あなたは日本語で会話できるAIアシスタントです。
以下のトピックに関する情報を基に、ユーザーからの質問に答えてください。
回答は丁寧で親しみやすい日本語で行ってください。
トピック：${topic.name}

情報：
${topic.content}

もしわからない質問があれば、「すみません、その質問についての情報がありません」と答えてください。
回答は簡潔にまとめ、文字数は300字以内を目安にしてください。

まず、ユーザーに対して挨拶と、このトピックについて何を知りたいか聞いてください。`
      });
      
      return response.text || "チャットを開始します。お気軽に質問してください。";
    } catch (error) {
      logger.error('Error starting chat:', error);
      return 'すみません、チャットを開始できませんでした。もう一度お試しください。';
    }
  }

  /**
   * Send a message to the AI and get a response, preserving conversation history
   */
  async sendMessage(topic: Topic, messages: ChatMessage[]): Promise<string> {
    try {
      // Get the latest user message
      const latestUserMessage = messages.filter(msg => msg.role === 'user').pop();
      
      if (!latestUserMessage) {
        return 'メッセージが見つかりませんでした。';
      }

      // Format the chat history for the AI
      const formattedHistory = this.formatChatHistory(messages, topic);
      
      // Send the prompt with history and get a response
      const response = await this.ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: formattedHistory
      });
      
      return response.text || "すみません、回答を生成できませんでした。";
    } catch (error) {
      logger.error('Error sending message to AI:', error);
      return 'すみません、エラーが発生しました。もう一度お試しください。';
    }
  }

  /**
   * Format chat history for the AI prompt
   */
  private formatChatHistory(messages: ChatMessage[], topic: Topic): string {
    // Context to give the AI about its role and the topic
    const systemContext = `あなたは日本語で会話できるAIアシスタントです。
以下のトピックに関する情報を基に、ユーザーからの質問に答えてください。
回答は丁寧で親しみやすい日本語で行ってください。
トピック：${topic.name}

情報：
${topic.content}

もしわからない質問があれば、「すみません、その質問についての情報がありません」と答えてください。
回答は簡潔にまとめ、文字数は300字以内を目安にしてください。

以下は今までの会話履歴です。会話の文脈を理解し、最後のユーザーの質問に答えてください。
`;

    // Format the conversation history
    let conversationHistory = "";
    messages.forEach(msg => {
      const role = msg.role === 'user' ? 'ユーザー' : 'アシスタント';
      conversationHistory += `${role}: ${msg.content}\n\n`;
    });

    // Combine system context and conversation history
    return systemContext + "\n\n" + conversationHistory;
  }
} 