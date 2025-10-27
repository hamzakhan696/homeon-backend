import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { EmailService } from '../email/email.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Buffer } from 'buffer';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private repo: Repository<Booking>,
    private emailService: EmailService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    // Convert date strings to Date objects if provided
    const bookingData: Partial<Booking> = {
      ...createBookingDto,
      dateOfBirth: createBookingDto.dateOfBirth ? new Date(createBookingDto.dateOfBirth) : undefined,
      nomineeDateOfBirth: createBookingDto.nomineeDateOfBirth ? new Date(createBookingDto.nomineeDateOfBirth) : undefined,
    };

    const booking = this.repo.create(bookingData);
    const saved = await this.repo.save(booking);
    
    // Send email notification
    try {
      await this.emailService.sendBookingEmail(saved);
    } catch (error) {
      console.error('Failed to send booking email:', error);
      // Don't fail the booking creation if email fails
    }
    
    return saved;
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async createWithCnic(dto: CreateBookingDto, localFiles: any[]) {
    const mapByField = (name: string) => (localFiles || []).find((f: any) => f?.originalname === name || f?.fieldname === name);
    // Accept any of these fieldnames in frontend: applicantCnicFront, applicantCnicBack, nomineeCnicFront, nomineeCnicBack, applicantPhoto
    const byFieldName = (key: string) => (localFiles || []).filter((f: any) => String(f.fieldname).toLowerCase() === key.toLowerCase());

    async function uploadOptional(file: any, cloudinary: CloudinaryService) {
      if (!file) return undefined;
      const res = await cloudinary.uploadBuffer(Buffer.from(file.buffer), { folder: 'homeon/bookings/cnic', resource_type: 'image' });
      return res.secure_url;
    }

    // Prefer fieldname match; otherwise fall back to first file
    const applicantFront = byFieldName('applicantCnicFront')[0] || mapByField('applicantCnicFront');
    const applicantBack = byFieldName('applicantCnicBack')[0] || mapByField('applicantCnicBack');
    const nomineeFront = byFieldName('nomineeCnicFront')[0] || mapByField('nomineeCnicFront');
    const nomineeBack = byFieldName('nomineeCnicBack')[0] || mapByField('nomineeCnicBack');
    const applicantPhoto = byFieldName('applicantPhoto')[0] || mapByField('applicantPhoto');

    const [appF, appB, nomF, nomB, appP] = await Promise.all([
      uploadOptional(applicantFront, this.cloudinary),
      uploadOptional(applicantBack, this.cloudinary),
      uploadOptional(nomineeFront, this.cloudinary),
      uploadOptional(nomineeBack, this.cloudinary),
      uploadOptional(applicantPhoto, this.cloudinary),
    ]);

    const payload: Partial<Booking> = {
      ...dto,
      dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
      nomineeDateOfBirth: dto.nomineeDateOfBirth ? new Date(dto.nomineeDateOfBirth) : undefined,
      applicantCnicFrontUrl: appF || dto.applicantCnicFrontUrl,
      applicantCnicBackUrl: appB || dto.applicantCnicBackUrl,
      nomineeCnicFrontUrl: nomF || dto.nomineeCnicFrontUrl,
      nomineeCnicBackUrl: nomB || dto.nomineeCnicBackUrl,
      applicantPhotoUrl: appP || dto.applicantPhotoUrl,
    };

    const booking = this.repo.create(payload);
    const saved = await this.repo.save(booking);
    try { await this.emailService.sendBookingEmail(saved); } catch {}
    return saved;
  }
}


