import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Faq, FaqDocument } from './faq.entity';

@Injectable()
export class FaqRepository {
  constructor(@InjectModel(Faq.name) private faqModel: Model<FaqDocument>) {}

  async create(faq: Partial<Faq>): Promise<Faq> {
    const newFaq = new this.faqModel(faq);
    return newFaq.save();
  }

  async findAll(): Promise<Faq[]> {
    return this.faqModel.find().exec();
  }

  async findById(id: string): Promise<Faq | null> {
    return this.faqModel.findById(id).exec();
  }

  async update(id: string, faq: Partial<Faq>): Promise<Faq | null> {
    return this.faqModel.findByIdAndUpdate(id, faq, { new: true }).exec();
  }

  async delete(id: string): Promise<Faq | null> {
    return this.faqModel.findByIdAndDelete(id).exec();
  }
}