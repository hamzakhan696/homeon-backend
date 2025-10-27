import { Controller, Get, Post, Body, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@ApiTags('bookings')
@Controller('admin/bookings')
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.service.create(createBookingDto);
  }

  @Post('create-with-cnic')
  @ApiOperation({ summary: 'Create a booking with CNIC images and applicant photo' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(AnyFilesInterceptor({
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
      if (allowed.includes(file.mimetype)) cb(null, true);
      else cb(null, false);
    },
  }))
  createWithCnic(@Body() dto: CreateBookingDto, @UploadedFiles() files: any[]) {
    return this.service.createWithCnic(dto, files);
  }

  @Get()
  @ApiOperation({ summary: 'List all bookings' })
  findAll() {
    return this.service.findAll();
  }
}


