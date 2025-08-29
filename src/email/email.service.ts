import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Booking } from '../bookings/entities/booking.entity';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendBookingEmail(booking: Booking): Promise<void> {
    const to = this.configService.get('BOOKINGS_EMAIL_TO', 'hamzakhan286692@gmail.com');
    
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
}
