import { IsString, IsEmail, IsOptional, IsNumber, IsDateString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  // Additional applicant information
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsIn(['LOCAL', 'OVERSEAS'])
  applicantType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsIn(['MALE', 'FEMALE'])
  gender?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  referenceId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fatherName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cnic?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  secondaryPhone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  occupation?: string;

  // Nominee/Joint Applicant Information
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsIn(['LOCAL', 'OVERSEAS'])
  nomineeType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsIn(['MALE', 'FEMALE'])
  nomineeGender?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nomineeFullName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nomineeFatherName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nomineeCnic?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  nomineeDateOfBirth?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nomineePrimaryPhone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nomineeSecondaryPhone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nomineeAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nomineeRelationship?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nomineeOccupation?: string;

  // CNIC images (Cloudinary URLs will be stored; for multipart, these are optional strings)
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  applicantCnicFrontUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  applicantCnicBackUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nomineeCnicFrontUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nomineeCnicBackUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  applicantPhotoUrl?: string;

  // Project information
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  projectId: number;

  @ApiProperty()
  @IsString()
  projectTitle: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  message?: string;
}
