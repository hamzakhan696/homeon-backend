import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiTags, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('blogs')
@Controller('admin/blogs')
export class BlogsController {
  constructor(private readonly service: BlogsService) {}

  @Post()
  create(@Body() dto: CreateBlogDto) {
    return this.service.create(dto);
  }

  @Post('create-with-media')
  @ApiOperation({ summary: 'Create blog with media uploads (multipart/form-data)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 20, {
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
      if (allowed.includes(file.mimetype)) cb(null, true);
      else cb(null, false);
    },
  }))
  createWithMedia(@Body() dto: CreateBlogDto, @UploadedFiles() files: any[]) {
    return this.service.createWithUploads(dto, files);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBlogDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}