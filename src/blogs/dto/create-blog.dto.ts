import { IsString, IsOptional, IsBoolean, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  descriptions?: string[];

  @IsOptional()
  @IsString()
  tags?: string; // comma separated

  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsIn(['draft', 'published'])
  status?: 'draft' | 'published';

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  publishDate?: Date;

  @IsOptional()
  @Transform(({ value }) => (value === 'true' || value === true))
  @IsBoolean()
  allowComments?: boolean;

  @IsOptional()
  @Transform(({ value }) => (value === 'true' || value === true))
  @IsBoolean()
  featureOnHomepage?: boolean;
}