import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Admin } from './entities/admin.entity';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Admin)
		private adminRepository: Repository<Admin>,
		private jwtService: JwtService,
	) {}

	async validateUser(identifier: string, password: string): Promise<any> {
		// identifier can be email or username
		const admin = await this.adminRepository.findOne({ 
			where: [
				{ email: identifier },
				{ username: identifier }
			],
			select: ['id', 'username', 'email', 'password', 'isActive'] 
		});

		if (admin && admin.isActive && await bcrypt.compare(password, admin.password)) {
			const { password, ...result } = admin;
			return result;
		}
		return null;
	}

	async login(loginDto: LoginDto) {
		const admin = await this.validateUser(loginDto.email, loginDto.password);
		
		if (!admin) {
			throw new UnauthorizedException('Invalid credentials');
		}

		// Update last login time
		await this.adminRepository.update(admin.id, { lastLoginAt: new Date() });

		const payload = { 
			username: admin.username, 
			sub: admin.id,
			email: admin.email 
		};

		return {
			access_token: this.jwtService.sign(payload),
			admin: {
				id: admin.id,
				username: admin.username,
				email: admin.email,
			}
		};
	}

	async createAdmin(createAdminDto: CreateAdminDto) {
		const { password, ...adminData } = createAdminDto;
		
		// Check if admin already exists
		const existingAdmin = await this.adminRepository.findOne({
			where: [
				{ username: adminData.username },
				{ email: adminData.email }
			]
		});

		if (existingAdmin) {
			throw new Error('Admin with this username or email already exists');
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		const admin = this.adminRepository.create({
			...adminData,
			password: hashedPassword,
		});

		const savedAdmin = await this.adminRepository.save(admin);
		const { password: _, ...result } = savedAdmin;
		return result;
	}

	async getProfile(userId: number) {
		const admin = await this.adminRepository.findOne({
			where: { id: userId },
			select: ['id', 'username', 'email', 'isActive', 'lastLoginAt', 'createdAt']
		});

		if (!admin) {
			throw new UnauthorizedException('Admin not found');
		}

		return admin;
	}
} 