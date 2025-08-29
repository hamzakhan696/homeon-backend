// Simple test script to verify email functionality
// Run with: node test-email.js

const nodemailer = require('nodemailer');

// Test email configuration
const testConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'test@example.com',
    pass: process.env.SMTP_PASS || 'test_password'
  }
};

// Test booking data
const testBooking = {
  id: 1,
  fullName: 'Test User',
  email: 'test@example.com',
  phone: '+1234567890',
  city: 'Lahore',
  projectTitle: 'Beautiful Office in Johar Town',
  location: 'Johar Town',
  price: '200000',
  currency: 'PKR',
  message: 'This is a test booking message',
  createdAt: new Date()
};

// Generate test email HTML
function generateTestEmailHTML(booking) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Test Booking Email</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #63b330; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { color: #333; }
        .project-details { background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏠 Test Booking Email</h1>
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
              ${booking.message}
            </div>
          </div>
          
          <div class="field">
            <span class="label">Test Date:</span>
            <span class="value">${new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Test email sending
async function testEmail() {
  console.log('🧪 Testing Email Functionality...\n');
  
  try {
    // Create transporter
    const transporter = nodemailer.createTransporter(testConfig);
    
    // Verify connection
    console.log('📡 Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!\n');
    
    // Generate test email
    const htmlContent = generateTestEmailHTML(testBooking);
    
    // Send test email
    console.log('📧 Sending test email...');
    const info = await transporter.sendMail({
      from: `"Homeon Test" <${testConfig.auth.user}>`,
        to: 'hamzakhan286692@gmail.com',
        subject: 'Test Booking Email - Homeon Backend',
      html: htmlContent,
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📬 Email sent to: hamzakhan286692@gmail.com');
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your .env file has SMTP_USER and SMTP_PASS');
    console.log('2. Verify Gmail app password is correct');
    console.log('3. Ensure 2FA is enabled on Gmail account');
    console.log('4. Check firewall/network restrictions');
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testEmail();
}

module.exports = { testEmail, generateTestEmailHTML };
