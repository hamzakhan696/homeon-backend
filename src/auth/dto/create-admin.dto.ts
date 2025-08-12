import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
} 