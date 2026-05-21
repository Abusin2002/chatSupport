import { Controller, Get, Post, Body, Render } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // Serve the chat page at "/"
  @Get()
  @Render('chat')
  chatPage() {
    return { messages: [] }; // initial empty messages
  }

  // Process message sent from form
  @Post('chat')
  async sendMessage(@Body('message') message: string) {
    const reply = await this.chatService.getReply(message);
    return { reply };
  }
}