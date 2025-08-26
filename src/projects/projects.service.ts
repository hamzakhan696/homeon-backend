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

  findAll() {
    return this.projectRepo.find();
  }

  findOne(id: number) {
    return this.projectRepo.findOneBy({ id });
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