import { Module } from '@nestjs/common';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Faq, FaqSchema } from './faq.entity';
import { FaqRepository } from './faq.repository';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Faq.name,schema:FaqSchema}]),

  ],
  controllers: [FaqController],
  providers: [FaqService,FaqRepository]
})
export class FaqModule {}
