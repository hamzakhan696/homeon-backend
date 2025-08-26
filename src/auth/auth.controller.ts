import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private configService: ConfigService) {}

	@Post('login')
	@ApiBody({ type: LoginDto })
	@ApiResponse({ status: 201, description: 'Login successful', schema: { example: { message: 'Login successful' } } })
	@ApiResponse({ status: 401, description: 'Invalid email or password' })
	login(@Body() body: LoginDto) {
		const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
		const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

		if (body.email === adminEmail && body.password === adminPassword) {
			return { message: 'Login successful' };
		} else {
			throw new UnauthorizedException('Invalid email or password');
		}
	}
} 