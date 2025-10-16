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

  // Additional applicant information
  @Column({ nullable: true })
  applicantType: string; // LOCAL or OVERSEAS

  @Column({ nullable: true })
  gender: string; // MALE or FEMALE

  @Column({ nullable: true })
  referenceId: string;

  @Column({ nullable: true })
  fatherName: string; // S/O, D/O, W/O

  @Column({ nullable: true })
  cnic: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  secondaryPhone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  occupation: string;

  // Nominee/Joint Applicant Information
  @Column({ nullable: true })
  nomineeType: string; // LOCAL or OVERSEAS

  @Column({ nullable: true })
  nomineeGender: string; // MALE or FEMALE

  @Column({ nullable: true })
  nomineeFullName: string;

  @Column({ nullable: true })
  nomineeFatherName: string; // S/O, D/O, W/O

  @Column({ nullable: true })
  nomineeCnic: string;

  @Column({ nullable: true })
  nomineeDateOfBirth: Date;

  @Column({ nullable: true })
  nomineePrimaryPhone: string;

  @Column({ nullable: true })
  nomineeSecondaryPhone: string;

  @Column({ nullable: true })
  nomineeAddress: string;

  @Column({ nullable: true })
  nomineeRelationship: string;

  @Column({ nullable: true })
  nomineeOccupation: string;

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


