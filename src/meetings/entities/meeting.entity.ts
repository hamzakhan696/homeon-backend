import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('meetings')
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  // User details
  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  // Meeting purpose
  @Column()
  meetingPurpose: string; // 'sale', 'purchase', or 'advice'

  // Preferred time
  @Column()
  preferredTime: string;

  // Additional message
  @Column('text', { nullable: true })
  message: string | null;

  @CreateDateColumn()
  createdAt: Date;
}

