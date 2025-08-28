import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  // User details
  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  // Project snapshot
  @Column()
  projectId: number;

  @Column()
  projectTitle: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  location: string;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  price: number | null;

  @Column({ nullable: true })
  currency: string;

  @Column('text', { nullable: true })
  message: string | null;

  @CreateDateColumn()
  createdAt: Date;
}


