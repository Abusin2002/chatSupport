import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Faq } from 'src/faq/faq.entity';
import axios from 'axios';
const OLLAMA_API_KEY = process.env.OLLAMA_API_KEY;
@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Faq')
    private readonly faqModel: Model<Faq>,
  ) {}

  async getReply(userMessage: string): Promise<string> {
    if (!userMessage || !userMessage.trim()) {
      return 'Please provide a message.';
    }

    // Step 1: Fetch FAQs
    const faqList = await this.faqModel.find();
    if (!faqList || faqList.length === 0) {
      return 'No FAQs available at the moment.';
    }

    // Step 2: Match user message to FAQ keywords
    const matchedFaq = this.findFaqAnswer(userMessage, faqList);
    if (!matchedFaq) {
      return "Sorry, I cannot answer this question. Please contact support.";
    }

    // Step 3: Prepare prompt for Ollama
    const prompt2 = `
You are a support chatbot. You must answer using ONLY the admin-provided answer below. 
Admin Answer: ${matchedFaq.answer_en} 
User asked: ${userMessage} 
Respond in the same language as the user. 
If the user asks in a different language (Tanglish, Tamil, Hindi, etc.), rewrite the answer in the same language, keeping the original meaning. 
Be friendly and polite.
`.replace(/\n/g, ' ');// remove line breaks for safety

const prompt = `
You are a friendly support assistant. Use ONLY the admin-provided information below to respond. 
Do NOT invent any new details. 
Paraphrase the answer naturally so it sounds like a human speaking. 
Respond in the same language as the user. 
Make it polite and conversational.

Admin Information: ${matchedFaq.answer_en}

User asked: ${userMessage}
`.replace(/\n/g, ' ');
    try {
      // Call Ollama API
      const response = await axios.post(
        'https://ollama.com/api/chat',
        // 'http://127.0.0.1:11434/api/generate',
        {
          model: 'gpt-oss:120b-cloud',
          prompt,
          stream: false, // return full text
        },
        {
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OLLAMA_API_KEY}` },
        }
      );

      // The response may be nested; adjust based on your Ollama version
      const aiReply = response.data?.output || response.data?.response || matchedFaq.answer_en;

      return aiReply.trim() || matchedFaq.answer_en;
    } catch (err) {
      console.error('Ollama API call failed:', err);
      return matchedFaq.answer_en; // fallback
    }
  }

  private findFaqAnswer(userMessage: string, faqList: Faq[]): Faq | null {
    const lowerMessage = userMessage.toLowerCase();
    for (const faq of faqList) {
      if (faq.keywords && faq.keywords.length) {
        for (const keyword of faq.keywords) {
          if (lowerMessage.includes(keyword.toLowerCase())) {
            return faq;
          }
        }
      }
    }
    return null;
  }
}