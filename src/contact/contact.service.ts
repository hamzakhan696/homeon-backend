import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { EmailService } from '../email/email.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private repo: Repository<Contact>,
    private emailService: EmailService,
  ) {}

  async create(createContactDto: CreateContactDto) {
    const contact = this.repo.create(createContactDto);
    const saved = await this.repo.save(contact);
    
    // Send email notification
    try {
      await this.emailService.sendContactEmail(saved);
    } catch (error) {
      console.error('Failed to send contact email:', error);
      // Don't fail the contact creation if email fails
    }
    
    return saved;
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
}
