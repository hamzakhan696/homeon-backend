import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogRepo: Repository<Blog>,
  ) {}

  create(dto: CreateBlogDto) {
    const blog = this.blogRepo.create(dto);
    return this.blogRepo.save(blog);
  }

  findAll() {
    return this.blogRepo.find();
  }

  findOne(id: number) {
    return this.blogRepo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateBlogDto) {
    const blog = await this.blogRepo.findOneBy({ id });
    if (!blog) throw new NotFoundException('Blog not found');
    Object.assign(blog, dto);
    return this.blogRepo.save(blog);
  }

  async remove(id: number) {
    const blog = await this.blogRepo.findOneBy({ id });
    if (!blog) throw new NotFoundException('Blog not found');
    await this.blogRepo.remove(blog);
    return { deleted: true };
  }
}