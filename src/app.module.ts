
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FaqModule } from './faq/faq.module';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/demo';
@Module({
   imports: [
     ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/demo'),
    FaqModule,
    ChatModule,
  ],
  
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
