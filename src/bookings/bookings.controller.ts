import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';

@ApiTags('bookings')
@Controller('admin/bookings')
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'List all bookings' })
  findAll() {
    return this.service.findAll();
  }
}


