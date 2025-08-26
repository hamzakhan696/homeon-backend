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

  async createWithUploads(dto: CreateBlogDto, localFiles: any[]) {
    const images = (localFiles || [])
      .filter((f: any) => f.mimetype?.startsWith('image/'))
      .map((f: any) => `data:${f.mimetype};base64,${Buffer.from(f.buffer).toString('base64')}`);

    let featuredImage: string | undefined;
    const regularImages: string[] = [];

    // If client marks first file as featured or sends a separate field, we will
    // treat first as featured for now; frontend will send featured first.
    if (images.length > 0) {
      featuredImage = images[0];
      if (images.length > 1) regularImages.push(...images.slice(1));
    }

    const blog = this.blogRepo.create({
      ...dto,
      featuredImage: featuredImage || null,
      images: regularImages.length ? regularImages : null,
    });

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