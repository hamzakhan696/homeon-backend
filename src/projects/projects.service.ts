import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  create(dto: CreateProjectDto) {
    const project = this.projectRepo.create(dto);
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