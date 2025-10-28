import { IsString, IsOptional, IsNumber, IsEnum, IsArray, IsBoolean, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export enum PropertyType {
  HOME = 'home',
  PLOTS = 'plots',
  COMMERCIAL = 'commercial'
}

export enum PropertySubtype {
  // Home subtypes
  HOUSE = 'house',
  FLAT = 'flat',
  UPPER = 'upper',
  LOWER = 'lower',
  FARMHOUSE = 'farmhouse',
  ROOM = 'room',
  PENTHOUSE = 'penthouse',
  
  // Plot subtypes
  RESIDENTIAL = 'residential',
  COMMERCIAL_PLOT = 'commercial',
  AGRICULTURAL = 'agricultural',
  INDUSTRIAL = 'industrial',
  
  // Commercial subtypes
  OFFICE = 'office',
  SHOP = 'shop',
  WAREHOUSE = 'warehouse',
  FACTORY = 'factory',
  OTHER = 'other'
}

export enum Purpose {
  SELL = 'sell',
  RENT = 'rent'
}

export enum AreaUnit {
  MARLA = 'marla',
  KANAL = 'kanal',
  SQ_FT = 'sq_ft',
  SQ_YD = 'sq_yd'
}

export enum Currency {
  PKR = 'PKR',
  USD = 'USD',
  EUR = 'EUR'
}

export class CreateProjectDto {
  @ApiProperty({
    description: 'Property title/name',
    example: 'Beautiful House in DHA Phase 5',
    maxLength: 200
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Detailed property description',
    example: 'Spacious 5-bedroom house with modern amenities in a prime location',
    maxLength: 2000
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Property purpose - sell or rent',
    enum: Purpose,
    example: Purpose.SELL
  })
  @Transform(({ value }) => typeof value === 'string' ? value.toLowerCase() : value)
  @IsEnum(Purpose)
  purpose: Purpose;

  @ApiProperty({
    description: 'Main property type',
    enum: PropertyType,
    example: PropertyType.HOME
  })
  @Transform(({ value }) => typeof value === 'string' ? value.toLowerCase() : value)
  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @ApiProperty({
    description: 'Specific property subtype',
    enum: PropertySubtype,
    example: PropertySubtype.HOUSE
  })
  @Transform(({ value }) => typeof value === 'string' ? value.toLowerCase().replace(/\s+/g, '_') : value)
  @IsEnum(PropertySubtype)
  propertySubtype: PropertySubtype;

  @ApiProperty({
    description: 'City where property is located',
    example: 'Lahore',
    maxLength: 100
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Specific area/neighborhood',
    example: 'DHA Phase 5',
    maxLength: 200
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Property area size',
    example: 10.5,
    minimum: 0.1
  })
  @Type(() => Number)
  @IsNumber()
  areaSize: number;

  @ApiProperty({
    description: 'Unit of area measurement',
    enum: AreaUnit,
    example: AreaUnit.MARLA
  })
  @Transform(({ value }) => typeof value === 'string' ? value.toLowerCase().replace(/\s+/g, '_') : value)
  @IsEnum(AreaUnit)
  areaUnit: AreaUnit;

  @ApiProperty({
    description: 'Property price',
    example: 25000000,
    minimum: 0
  })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Currency for the price',
    enum: Currency,
    example: Currency.PKR
  })
  @Transform(({ value }) => typeof value === 'string' ? value.toUpperCase() : value)
  @IsEnum(Currency)
  currency: Currency;

  @ApiProperty({
    description: 'Whether property is available on installments',
    example: false,
    required: false
  })
  @Transform(({ value }) => (value === true || value === 'true' || value === 1))
  @IsOptional()
  @IsBoolean()
  availableOnInstallments?: boolean;

  @ApiProperty({
    description: 'Advance amount required for installment purchase',
    example: 500000,
    required: false
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  advanceAmount?: number;

  @ApiProperty({
    description: 'Number of installments',
    example: 24,
    required: false
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  numberOfInstallments?: number;

  @ApiProperty({
    description: 'Monthly installment amount',
    example: 50000,
    required: false
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  monthlyInstallment?: number;

  @ApiProperty({
    description: 'Whether property is ready for possession',
    example: true,
    required: false
  })
  @Transform(({ value }) => (value === true || value === 'true' || value === 1))
  @IsOptional()
  @IsBoolean()
  readyForPossession?: boolean;

  @ApiProperty({
    description: 'Number of bedrooms',
    example: '5',
    required: false
  })
  @IsOptional()
  @IsString()
  bedrooms?: string;

  @ApiProperty({
    description: 'Number of bathrooms',
    example: '4',
    required: false
  })
  @IsOptional()
  @IsString()
  bathrooms?: string;

  @ApiProperty({
    description: 'List of property amenities',
    example: ['Parking Space', 'Garden', 'Security System'],
    type: [String],
    required: false
  })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try { const arr = JSON.parse(value); if (Array.isArray(arr)) return arr; } catch {}
      return value.split(',').map((v: string) => v.trim()).filter(Boolean);
    }
    return value;
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @ApiProperty({
    description: 'List of project image filenames',
    example: ['house_front.jpg', 'house_interior.jpg'],
    type: [String],
    required: false
  })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try { const arr = JSON.parse(value); if (Array.isArray(arr)) return arr; } catch {}
      return value.split(',').map((v: string) => v.trim()).filter(Boolean);
    }
    return value;
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  projectImages?: string[];

  @ApiProperty({
    description: 'List of project video filenames',
    example: ['house_tour.mp4'],
    type: [String],
    required: false
  })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try { const arr = JSON.parse(value); if (Array.isArray(arr)) return arr; } catch {}
      return value.split(',').map((v: string) => v.trim()).filter(Boolean);
    }
    return value;
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  projectVideos?: string[];

  @ApiProperty({
    description: 'List of YouTube video URLs',
    example: ['https://youtube.com/watch?v=example'],
    type: [String],
    required: false
  })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try { const arr = JSON.parse(value); if (Array.isArray(arr)) return arr; } catch {}
      return value.split(',').map((v: string) => v.trim()).filter(Boolean);
    }
    return value;
  })
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  youtubeLinks?: string[];

  @ApiProperty({
    description: 'Contact email address',
    example: 'contact@example.com',
    required: false
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    description: 'Contact mobile number',
    example: '+923001234567',
    required: false
  })
  @IsOptional()
  @IsString()
  mobile?: string;

  @ApiProperty({
    description: 'Contact landline number',
    example: '+92421234567',
    required: false
  })
  @IsOptional()
  @IsString()
  landline?: string;

  @ApiProperty({
    description: 'Cover image filename',
    example: 'house_front.jpg',
    required: false
  })
  @IsOptional()
  @IsString()
  coverImage?: string;
}