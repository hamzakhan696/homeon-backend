import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AuthSeeder {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async seed() {
    // Check if admin already exists
    const existingAdmin = await this.adminRepository.findOne({
      where: { username: 'admin' }
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const admin = this.adminRepository.create({
        username: 'admin',
        email: 'admin@homeon.pk',
        password: hashedPassword,
        isActive: true,
      });

      await this.adminRepository.save(admin);
      console.log('Default admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  }
} 