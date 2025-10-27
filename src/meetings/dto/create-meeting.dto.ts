import { IsString, IsEmail, IsOptional, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMeetingDto {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsIn(['sale', 'purchase', 'advice'])
  meetingPurpose: string;

  @ApiProperty()
  @IsString()
  preferredTime: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  message?: string;
}

