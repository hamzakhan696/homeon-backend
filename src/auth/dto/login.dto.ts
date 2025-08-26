import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
	@ApiProperty({ example: 'admin@homeon.pk' })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ example: 'admin@jan_2025' })
	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	password: string;
} 