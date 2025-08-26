import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: Purpose
  })
  purpose: Purpose;

  @Column({
    type: 'enum',
    enum: PropertyType
  })
  propertyType: PropertyType;

  @Column({
    type: 'enum',
    enum: PropertySubtype
  })
  propertySubtype: PropertySubtype;

  @Column()
  city: string;

  @Column()
  location: string;

  @Column('decimal', { precision: 10, scale: 2 })
  areaSize: number;

  @Column({
    type: 'enum',
    enum: AreaUnit
  })
  areaUnit: AreaUnit;

  @Column('decimal', { precision: 15, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: Currency
  })
  currency: Currency;

  @Column({ default: false })
  availableOnInstallments: boolean;

  @Column({ default: false })
  readyForPossession: boolean;

  @Column({ nullable: true })
  bedrooms: string;

  @Column({ nullable: true })
  bathrooms: string;

  @Column('simple-array', { nullable: true })
  amenities: string[];

  @Column('simple-array', { nullable: true })
  projectImages: string[];

  @Column('simple-array', { nullable: true })
  projectVideos: string[];

  @Column('simple-array', { nullable: true })
  youtubeLinks: string[];

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  landline: string;

  @Column({ nullable: true })
  coverImage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}