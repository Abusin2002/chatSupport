import { Controller, Get, Post, Body, Param, Render, Redirect } from '@nestjs/common';
import { FaqService } from './faq.service';
import { Faq } from './faq.entity';

@Controller('faqs')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  // List + Add form
  @Get()
  @Render('index')
  async list() {
    const faqs = await this.faqService.getAllFaqs();
    return { faqs };
  }

  // Create new FAQ
  @Post()
  @Redirect('/faqs')
  async create(@Body() body: any) {
    const { category, keywords, answer_en } = body;
    await this.faqService.createFaq({
      category,
      keywords: keywords.split(',').map(k => k.trim()), // convert string to array
      answer_en,
    });
  }

  // Edit form
  @Get('edit/:id')
  @Render('edit')
  async edit(@Param('id') id: string) {
    const faq = await this.faqService.getFaqById(id);
    return { faq };
  }

  // Update FAQ
  @Post('update/:id')
  @Redirect('/faqs')
  async update(@Param('id') id: string, @Body() body: any) {
    const { category, keywords, answer_en } = body;
    await this.faqService.updateFaq(id, {
      category,
      keywords: keywords.split(',').map(k => k.trim()),
      answer_en,
    });
  }

  

  // Delete FAQ
  @Get('delete/:id')
  @Redirect('/faqs')
  async delete(@Param('id') id: string) {
    await this.faqService.deleteFaq(id);
  }
}