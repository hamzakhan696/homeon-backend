import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meeting } from './entities/meeting.entity';
import { EmailService } from '../email/email.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting)
    private repo: Repository<Meeting>,
    private emailService: EmailService,
  ) {}

  async create(createMeetingDto: CreateMeetingDto) {
    const meeting = this.repo.create(createMeetingDto);
    const saved = await this.repo.save(meeting);
    
    // Send email notification
    try {
      await this.emailService.sendMeetingEmail(saved);
    } catch (error) {
      console.error('Failed to send meeting email:', error);
      // Don't fail the meeting creation if email fails
    }
    
    return saved;
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
}

