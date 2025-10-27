import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { Contact } from './entities/contact.entity';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), EmailModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
