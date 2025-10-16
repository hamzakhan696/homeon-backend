import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', nullable: true })
  category: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  // Store multiple descriptions as JSON array
  @Column({ type: 'simple-json', nullable: true })
  descriptions: string[] | null;

  @Column({ type: 'text', nullable: true })
  tags: string | null; // comma-separated for simplicity

  @Column({ type: 'varchar', nullable: true })
  metaTitle: string | null;

  @Column({ type: 'text', nullable: true })
  metaDescription: string | null;

  @Column({ type: 'varchar', nullable: true })
  slug: string | null;

  @Column({ type: 'varchar', default: 'draft' })
  status: string; // draft | published

  @Column({ type: 'datetime', nullable: true })
  publishDate: Date | null;

  @Column({ type: 'boolean', default: false })
  allowComments: boolean;

  @Column({ type: 'boolean', default: false })
  featureOnHomepage: boolean;

  // Store as data URL (base64) similar to projects implementation
  @Column({ type: 'longtext', nullable: true })
  featuredImage: string | null;

  // Array of data URLs (base64)
  @Column({ type: 'simple-json', nullable: true })
  images: string[] | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}