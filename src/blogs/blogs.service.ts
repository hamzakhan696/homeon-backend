import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogRepo: Repository<Blog>,
    private readonly cloudinary: CloudinaryService,
  ) {}

  create(dto: CreateBlogDto) {
    // Ensure descriptions array is properly handled
    const blogData = {
      ...dto,
      descriptions: dto.descriptions || (dto.description ? [dto.description] : null)
    };
    const blog = this.blogRepo.create(blogData);
    return this.blogRepo.save(blog);
  }

  async createWithUploads(dto: CreateBlogDto, localFiles: any[]) {
    const files = (localFiles || []).filter((f: any) => f.mimetype?.startsWith('image/'));
    const uploads = await Promise.all(
      files.map((f: any) =>
        this.cloudinary.uploadBuffer(Buffer.from(f.buffer), {
          folder: 'homeon/blogs/images',
          resource_type: 'image',
        }),
      ),
    );

    const urls = uploads.map((u) => u.secure_url);
    const featuredImage = urls[0] || null;
    const regularImages = urls.length > 1 ? urls.slice(1) : null;

    // Handle descriptions from multipart form data
    let descriptions = dto.descriptions;
    if (!descriptions && dto.description) {
      descriptions = [dto.description];
    }

    const blog = this.blogRepo.create({
      ...dto,
      featuredImage,
      images: regularImages,
      descriptions: descriptions
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
    
    // Handle descriptions properly
    const updateData = {
      ...dto,
      descriptions: dto.descriptions || (dto.description ? [dto.description] : blog.descriptions)
    };
    
    Object.assign(blog, updateData);
    return this.blogRepo.save(blog);
  }

  async updateWithUploads(id: number, dto: UpdateBlogDto, localFiles: any[]) {
    const blog = await this.blogRepo.findOneBy({ id });
    if (!blog) throw new NotFoundException('Blog not found');

    const files = (localFiles || []).filter((f: any) => f.mimetype?.startsWith('image/'));
    let featuredImage = blog.featuredImage || null;
    let images = Array.isArray(blog.images) ? [...blog.images] : [];

    if (files.length > 0) {
      const uploads = await Promise.all(
        files.map((f: any) =>
          this.cloudinary.uploadBuffer(Buffer.from(f.buffer), {
            folder: 'homeon/blogs/images',
            resource_type: 'image',
          }),
        ),
      );
      const urls = uploads.map((u) => u.secure_url);

      // If client provided a new featured image (first file), use it
      if (urls[0]) featuredImage = urls[0];

      // For edit flow, when user uploads new gallery images, replace the gallery
      // with the new selection (excluding the first which is featured),
      // to mirror the project editor behaviour.
      if (urls.length > 1) {
        images = urls.slice(1);
      }
    }

    const updateData = {
      ...dto,
      descriptions: dto.descriptions || (dto.description ? [dto.description] : blog.descriptions),
      featuredImage,
      images: images.length ? images : null,
    } as Partial<Blog>;

    Object.assign(blog, updateData);
    return this.blogRepo.save(blog);
  }

  async remove(id: number) {
    const blog = await this.blogRepo.findOneBy({ id });
    if (!blog) throw new NotFoundException('Blog not found');
    await this.blogRepo.remove(blog);
    return { deleted: true };
  }
}