import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiBody, ApiResponse, ApiProperty } from '@nestjs/swagger';

class LoginDto {
  @ApiProperty({ example: 'admin@homeon.pk' })
  email: string;
  @ApiProperty({ example: 'admin123' })
  password: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private configService: ConfigService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'Login successful', schema: { example: { message: 'Login successful' } } })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  login(@Body() body: LoginDto) {
    const adminEmail = this.configService.get('ADMIN_EMAIL');
    const adminPassword = this.configService.get('ADMIN_PASSWORD');

    if (body.email === adminEmail && body.password === adminPassword) {
      return { message: 'Login successful' };
    } else {
      throw new UnauthorizedException('Invalid email or password');
    }
  }
} 