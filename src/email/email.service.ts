import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Booking } from '../bookings/entities/booking.entity';
import { Meeting } from '../meetings/entities/meeting.entity';
import { Contact } from '../contact/entities/contact.entity';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendBookingEmail(booking: Booking): Promise<void> {
    const to = this.configService.get('BOOKINGS_EMAIL_TO', 'Salam@homeon.pk');
    
    // Debug logging
    console.log('[EMAIL DEBUG] Configuration:');
    console.log('[EMAIL DEBUG] SMTP_HOST:', this.configService.get('SMTP_HOST'));
    console.log('[EMAIL DEBUG] SMTP_PORT:', this.configService.get('SMTP_PORT'));
    console.log('[EMAIL DEBUG] SMTP_USER:', this.configService.get('SMTP_USER'));
    console.log('[EMAIL DEBUG] SMTP_PASS:', this.configService.get('SMTP_PASS') ? '***SET***' : 'NOT SET');
    console.log('[EMAIL DEBUG] Sending to:', to);
    
    const subject = `New Booking Request - ${booking.projectTitle}`;
    
    const htmlContent = this.generateBookingEmailHTML(booking);
    
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        html: htmlContent,
      });
      
      console.log(`[EMAIL SENT] Booking email sent to ${to} for booking #${booking.id}`);
    } catch (error) {
      console.error('[EMAIL ERROR] Failed to send booking email:', error);
      console.error('[EMAIL ERROR] Full error details:', {
        message: error.message,
        code: error.code,
        command: error.command
      });
      throw error;
    }
  }

  private generateBookingEmailHTML(booking: Booking): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Booking Request</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #63b330; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; }
          .value { color: #333; }
          .project-details { background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏠 New Booking Request</h1>
            <p>Homeon - Real Estate Services</p>
          </div>
          
          <div class="content">
            <h2>Customer Information</h2>
            <div class="field">
              <span class="label">Full Name:</span>
              <span class="value">${booking.fullName}</span>
            </div>
            <div class="field">
              <span class="label">Email:</span>
              <span class="value">${booking.email}</span>
            </div>
            <div class="field">
              <span class="label">Phone:</span>
              <span class="value">${booking.phone}</span>
            </div>
            <div class="field">
              <span class="label">City:</span>
              <span class="value">${booking.city}</span>
            </div>
            
            <div class="project-details">
              <h3>Project Details</h3>
              <div class="field">
                <span class="label">Project Title:</span>
                <span class="value">${booking.projectTitle}</span>
              </div>
              <div class="field">
                <span class="label">Location:</span>
                <span class="value">${booking.location}</span>
              </div>
              <div class="field">
                <span class="label">Price:</span>
                <span class="value">${booking.price} ${booking.currency}</span>
              </div>
            </div>
            
            <div class="field">
              <span class="label">Message:</span>
              <div class="value" style="margin-top: 5px; padding: 10px; background-color: white; border-radius: 3px; border-left: 3px solid #63b330;">
                ${booking.message || 'No additional message provided'}
              </div>
            </div>
            
            <div class="field">
              <span class="label">Booking Date:</span>
              <span class="value">${new Date(booking.createdAt).toLocaleString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>
          
          <div class="footer">
            <p>This email was sent automatically from the Homeon booking system.</p>
            <p>Booking ID: #${booking.id}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  async sendMeetingEmail(meeting: Meeting): Promise<void> {
    const to = this.configService.get('MEETINGS_EMAIL_TO', 'homeon.pk@gmail.com');
    
    console.log('[EMAIL DEBUG] Sending meeting email to:', to);
    
    const subject = `New Meeting Request - ${this.getMeetingPurposeLabel(meeting.meetingPurpose)}`;
    
    const htmlContent = this.generateMeetingEmailHTML(meeting);
    
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        html: htmlContent,
      });
      
      console.log(`[EMAIL SENT] Meeting email sent to ${to} for meeting #${meeting.id}`);
    } catch (error) {
      console.error('[EMAIL ERROR] Failed to send meeting email:', error);
      throw error;
    }
  }

  private getMeetingPurposeLabel(purpose: string): string {
    const labels = {
      'sale': 'For Sale',
      'purchase': 'For Purchase',
      'advice': 'For Advice'
    };
    return labels[purpose] || purpose;
  }

  private generateMeetingEmailHTML(meeting: Meeting): string {
    const purposeLabel = this.getMeetingPurposeLabel(meeting.meetingPurpose);
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Meeting Request</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #63b330; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; }
          .value { color: #333; }
          .purpose-badge { background-color: #e8f5e8; padding: 10px 15px; border-radius: 5px; display: inline-block; margin: 10px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📅 New Meeting Request</h1>
            <p>Homeon - Real Estate Services</p>
          </div>
          
          <div class="content">
            <h2>Client Information</h2>
            <div class="field">
              <span class="label">Full Name:</span>
              <span class="value">${meeting.fullName}</span>
            </div>
            <div class="field">
              <span class="label">Email:</span>
              <span class="value">${meeting.email}</span>
            </div>
            <div class="field">
              <span class="label">Phone:</span>
              <span class="value">${meeting.phone}</span>
            </div>
            
            <div class="purpose-badge">
              <strong>Meeting Purpose:</strong> ${purposeLabel}
            </div>
            
            <div class="field">
              <span class="label">Preferred Time:</span>
              <div class="value" style="margin-top: 5px; padding: 10px; background-color: white; border-radius: 3px; border-left: 3px solid #63b330;">
                ${meeting.preferredTime}
              </div>
            </div>
            
            ${meeting.message ? `
            <div class="field">
              <span class="label">Additional Message:</span>
              <div class="value" style="margin-top: 5px; padding: 10px; background-color: white; border-radius: 3px; border-left: 3px solid #63b330;">
                ${meeting.message}
              </div>
            </div>
            ` : ''}
            
            <div class="field">
              <span class="label">Request Date:</span>
              <span class="value">${new Date(meeting.createdAt).toLocaleString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>
          
          <div class="footer">
            <p>This email was sent automatically from the Homeon meeting system.</p>
            <p>Meeting ID: #${meeting.id}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  async sendContactEmail(contact: Contact): Promise<void> {
    const to = this.configService.get('CONTACT_EMAIL_TO', 'salam@homeon.pk');
    
    console.log('[EMAIL DEBUG] Sending contact email to:', to);
    
    const subject = `New Contact Inquiry - ${contact.subject}`;
    
    const htmlContent = this.generateContactEmailHTML(contact);
    
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        html: htmlContent,
      });
      
      console.log(`[EMAIL SENT] Contact email sent to ${to} for contact #${contact.id}`);
    } catch (error) {
      console.error('[EMAIL ERROR] Failed to send contact email:', error);
      throw error;
    }
  }

  private generateContactEmailHTML(contact: Contact): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Inquiry</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #63b330; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; }
          .value { color: #333; }
          .subject-badge { background-color: #e8f5e8; padding: 10px 15px; border-radius: 5px; display: inline-block; margin: 10px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 New Contact Inquiry</h1>
            <p>Homeon - Real Estate Services</p>
          </div>
          
          <div class="content">
            <h2>Client Information</h2>
            <div class="field">
              <span class="label">Full Name:</span>
              <span class="value">${contact.fullName}</span>
            </div>
            <div class="field">
              <span class="label">Email:</span>
              <span class="value">${contact.email}</span>
            </div>
            <div class="field">
              <span class="label">Phone:</span>
              <span class="value">${contact.phone}</span>
            </div>
            
            <div class="subject-badge">
              <strong>Subject:</strong> ${contact.subject}
            </div>
            
            ${contact.message ? `
            <div class="field">
              <span class="label">Message:</span>
              <div class="value" style="margin-top: 5px; padding: 10px; background-color: white; border-radius: 3px; border-left: 3px solid #63b330;">
                ${contact.message}
              </div>
            </div>
            ` : ''}
            
            <div class="field">
              <span class="label">Inquiry Date:</span>
              <span class="value">${new Date(contact.createdAt).toLocaleString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>
          
          <div class="footer">
            <p>This email was sent automatically from the Homeon contact system.</p>
            <p>Contact ID: #${contact.id}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
