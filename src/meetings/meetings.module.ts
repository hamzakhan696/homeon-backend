import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';
import { Meeting } from './entities/meeting.entity';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting]), EmailModule],
  controllers: [MeetingsController],
  providers: [MeetingsService],
})
export class MeetingsModule {}

