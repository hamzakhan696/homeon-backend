import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@ApiTags('contact')
@Controller('admin/contact')
export class ContactController {
  constructor(private readonly service: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contact inquiry' })
  create(@Body() createContactDto: CreateContactDto) {
    return this.service.create(createContactDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all contact inquiries' })
  findAll() {
    return this.service.findAll();
  }
}
