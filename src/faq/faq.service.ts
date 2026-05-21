import { Injectable, NotFoundException } from '@nestjs/common';
import { FaqRepository } from './faq.repository';
import { Faq } from './faq.entity';

@Injectable()
export class FaqService {
  constructor(private readonly faqRepo: FaqRepository) {}

  createFaq(faq: Partial<Faq>) {
    return this.faqRepo.create(faq);
  }

  getAllFaqs() {
    return this.faqRepo.findAll();
  }

  async updateFaq(id: string, faq: Partial<Faq>) {
    const updated = await this.faqRepo.update(id, faq);
    if (!updated) throw new NotFoundException('FAQ not found');
    return updated;
  }

  async getFaqById(id: string) {
  const faq = await this.faqRepo.findById(id);
  if (!faq) throw new NotFoundException('FAQ not found');
  return faq;
}

  async deleteFaq(id: string) {
    const deleted = await this.faqRepo.delete(id);
    if (!deleted) throw new NotFoundException('FAQ not found');
    return { message: 'Deleted successfully' };
  }
}