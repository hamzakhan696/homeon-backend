import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || 'your-super-secret-key-change-in-production',
  signOptions: { 
    expiresIn: '24h' 
  },
}; 