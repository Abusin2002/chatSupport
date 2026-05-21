import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FaqDocument = Faq & Document;

@Schema({ timestamps: true })
export class Faq {
  @Prop({ required: true })
  category: string;

  @Prop({ type: [String], default: [] })
  keywords: string[];

  @Prop({ required: true })
  answer_en: string;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);