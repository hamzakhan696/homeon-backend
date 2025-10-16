import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { EmailService } from '../email/email.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private repo: Repository<Booking>,
    private emailService: EmailService,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    // Convert date strings to Date objects if provided
    const bookingData: Partial<Booking> = {
      ...createBookingDto,
      dateOfBirth: createBookingDto.dateOfBirth ? new Date(createBookingDto.dateOfBirth) : undefined,
      nomineeDateOfBirth: createBookingDto.nomineeDateOfBirth ? new Date(createBookingDto.nomineeDateOfBirth) : undefined,
    };

    const booking = this.repo.create(bookingData);
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


