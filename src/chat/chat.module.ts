import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FaqSchema } from 'src/faq/faq.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'Faq',schema:FaqSchema}]),
  ],

  providers: [ChatService,ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
