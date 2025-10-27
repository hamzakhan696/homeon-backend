import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  // User details
  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  subject: string;

  // Additional message
  @Column('text', { nullable: true })
  message: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
