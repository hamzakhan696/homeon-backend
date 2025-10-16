import { IsString, IsEmail, IsOptional, IsNumber, IsDateString, IsIn } from 'class-validator';
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

  // Project information
  @ApiProperty()
  @IsNumber()
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
