import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { EmailService } from '../email/email.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private repo: Repository<Booking>,
    private emailService: EmailService,
  ) {}

  async create(data: Partial<Booking>) {
    const booking = this.repo.create(data);
    const saved = await this.repo.save(booking);
    
    // Send email notification
    try {
      await this.emailService.sendBookingEmail(saved);
    } catch (error) {
      console.error('Failed to send booking email:', error);
      // Don't fail the booking creation if email fails
    }
    
    return saved;
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
}


