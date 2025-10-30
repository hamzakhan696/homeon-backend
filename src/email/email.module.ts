import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('SMTP_HOST', 'smtp.gmail.com'),
          port: configService.get('SMTP_PORT', 587),
          secure: String(configService.get('SMTP_SECURE', 'false')).toLowerCase() === 'true',
          ignoreTLS: String(configService.get('SMTP_IGNORE_TLS', 'false')).toLowerCase() === 'true',
          auth: {
            user: configService.get('SMTP_USER'),
            pass: configService.get('SMTP_PASS'),
          },
          tls: {
            // Fix self-signed certificate error when using certain SMTP providers
            rejectUnauthorized: String(configService.get('SMTP_TLS_REJECT_UNAUTHORIZED', 'false')).toLowerCase() === 'true',
          },
        },
        defaults: {
          from: `"Homeon" <${configService.get('SMTP_USER')}>`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
