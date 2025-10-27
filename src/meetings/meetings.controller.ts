import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';

@ApiTags('meetings')
@Controller('admin/meetings')
export class MeetingsController {
  constructor(private readonly service: MeetingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new meeting request' })
  create(@Body() createMeetingDto: CreateMeetingDto) {
    return this.service.create(createMeetingDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all meeting requests' })
  findAll() {
    return this.service.findAll();
  }
}

