import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private repo: Repository<Booking>,
  ) {}

  async create(data: Partial<Booking>) {
    const booking = this.repo.create(data);
    const saved = await this.repo.save(booking);
    // Fire-and-forget email (log-based placeholder). Integrate real mailer if configured.
    try {
      await this.sendEmail(saved);
    } catch (e) {
      // swallow email errors
    }
    return saved;
  }

  private async sendEmail(b: Booking): Promise<void> {
    const to = process.env.BOOKINGS_EMAIL_TO || 'salam@homeon.pk';
    // If you add Nest Mailer later, plug it here. For now, write to console.
    // eslint-disable-next-line no-console
    console.log(`[BOOKING EMAIL] -> ${to}: New booking #${b.id} by ${b.fullName} for project ${b.projectTitle}`);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
}


