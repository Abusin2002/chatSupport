import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FaqSchema } from 'src/faq/faq.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
    MongooseModule.forFeature([{name:'Faq',schema:FaqSchema}]),
  ],

  providers: [ChatService,ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
