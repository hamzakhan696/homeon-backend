import { IsString, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  location?: string;
}