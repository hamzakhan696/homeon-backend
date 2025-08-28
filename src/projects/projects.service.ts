// src/projects/projects.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Buffer } from 'buffer';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  async create(dto: CreateProjectDto) {
    const project = this.projectRepo.create(dto);
    return this.projectRepo.save(project);
  }

  async createWithUploads(dto: CreateProjectDto, localFiles: any[]) {
    // Convert images to base64
    const images = (localFiles || [])
      .filter((f: any) => f.mimetype?.startsWith('image/'))
      .map((f: any) => Buffer.from(f.buffer).toString('base64'));

    // Convert videos to base64 (optional, due to size constraints)
    const videos = (localFiles || [])
      .filter((f: any) => f.mimetype?.startsWith('video/'))
      .map((f: any) => Buffer.from(f.buffer).toString('base64'));

    const project = this.projectRepo.create({
      ...dto,
      projectImages: [...(dto.projectImages || []), ...images.map((img) => `data:image/jpeg;base64,${img}`)],
      projectVideos: [...(dto.projectVideos || []), ...videos.map((vid) => `data:video/mp4;base64,${vid}`)],
    });

    return this.projectRepo.save(project);
  }

  private normalizeMediaArray(input: string[] | null | undefined): string[] | null {
    if (!input || input.length === 0) return input ?? null;
    const result: string[] = [];
    for (let i = 0; i < input.length; i += 1) {
      const current = input[i];
      if (typeof current === 'string' && /^data:(image|video)\//i.test(current)) {
        const next = input[i + 1];
        if (typeof next === 'string' && !/^data:(image|video)\//i.test(next)) {
          result.push(`${current},${next}`);
          i += 1; // skip the next chunk since we've consumed it
          continue;
        }
      }
      result.push(current);
    }
    return result;
  }

  async findAll() {
    const items = await this.projectRepo.find();
    return items.map((p) => ({
      ...p,
      projectImages: this.normalizeMediaArray(p.projectImages),
      projectVideos: this.normalizeMediaArray(p.projectVideos),
      youtubeLinks: Array.isArray(p.youtubeLinks) ? p.youtubeLinks : p.youtubeLinks ?? null,
    }));
  }

  async findOne(id: number) {
    const p = await this.projectRepo.findOneBy({ id });
    if (!p) return null;
    return {
      ...p,
      projectImages: this.normalizeMediaArray(p.projectImages),
      projectVideos: this.normalizeMediaArray(p.projectVideos),
      youtubeLinks: Array.isArray(p.youtubeLinks) ? p.youtubeLinks : p.youtubeLinks ?? null,
    } as any;
  }

  async search(filters: {
    city?: string;
    location?: string;
    propertyType?: string;
    bedrooms?: string;
    minPrice?: number;
    maxPrice?: number;
    minArea?: number;
    maxArea?: number;
  }) {
    const qb = this.projectRepo.createQueryBuilder('p');
    if (filters.city) qb.andWhere('p.city LIKE :city', { city: `%${filters.city}%` });
    if (filters.location) qb.andWhere('p.location LIKE :location', { location: `%${filters.location}%` });
    if (filters.propertyType) qb.andWhere('p.propertyType = :ptype', { ptype: filters.propertyType });
    if (filters.bedrooms && filters.bedrooms !== 'All') qb.andWhere('p.bedrooms = :bed', { bed: String(filters.bedrooms) });
    if (typeof filters.minPrice === 'number') qb.andWhere('p.price >= :minPrice', { minPrice: filters.minPrice });
    if (typeof filters.maxPrice === 'number') qb.andWhere('p.price <= :maxPrice', { maxPrice: filters.maxPrice });
    if (typeof filters.minArea === 'number') qb.andWhere('p.areaSize >= :minArea', { minArea: filters.minArea });
    if (typeof filters.maxArea === 'number') qb.andWhere('p.areaSize <= :maxArea', { maxArea: filters.maxArea });
    qb.orderBy('p.createdAt', 'DESC');
    const items = await qb.getMany();
    return items.map((p) => ({
      ...p,
      projectImages: this.normalizeMediaArray(p.projectImages),
      projectVideos: this.normalizeMediaArray(p.projectVideos),
      youtubeLinks: Array.isArray(p.youtubeLinks) ? p.youtubeLinks : p.youtubeLinks ?? null,
    }));
  }

  async update(id: number, dto: UpdateProjectDto) {
    const project = await this.projectRepo.findOneBy({ id });
    if (!project) throw new NotFoundException('Project not found');
    Object.assign(project, dto);
    return this.projectRepo.save(project);
  }

  async remove(id: number) {
    const project = await this.projectRepo.findOneBy({ id });
    if (!project) throw new NotFoundException('Project not found');
    await this.projectRepo.remove(project);
    return { deleted: true };
  }
}