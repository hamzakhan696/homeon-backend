<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Enhanced ProjectsTab Component

A comprehensive React component for managing real estate projects with advanced form handling, file uploads, and API integration.

## Features

### 🏠 Property Management
- **Property Types**: Home, Plots, Commercial
- **Property Subtypes**: Detailed categorization for each main type
- **Purpose Selection**: Sell or Rent options
- **Location Management**: City and specific location inputs

### 📝 Form Features
- **Comprehensive Form Fields**: Title, description, area, price, amenities
- **Form Validation**: Client-side validation with error messages
- **State Management**: Centralized form state with React hooks
- **Responsive Design**: Mobile-friendly layout

### 🖼️ Media Management
- **Image Uploads**: Support for JPG/PNG files up to 5MB
- **Video Uploads**: Support for MP4, AVI, MOV, WMV up to 50MB
- **YouTube Integration**: Add YouTube video links
- **Cover Image Selection**: Set primary image for listings
- **File Preview**: Visual preview of uploaded media

### 🎨 UI/UX Features
- **Progress Steps**: Visual progress indicator
- **Modern Design**: Clean, professional interface
- **Interactive Elements**: Hover effects and animations
- **Responsive Layout**: Works on all device sizes

## Installation

### Prerequisites
- React 16.8+ (for hooks)
- Axios for API calls
- Font Awesome for icons

### Dependencies
```bash
npm install axios
```

### Font Awesome Setup
Add Font Awesome to your HTML or install via npm:
```bash
npm install @fortawesome/fontawesome-free
```

## Usage

### Basic Implementation
```jsx
import ProjectsTab from './ProjectsTab';
import './ProjectsTab.css';

function App() {
  return (
    <div className="App">
      <ProjectsTab />
    </div>
  );
}
```

### With Custom Configuration
```jsx
import ProjectsTab from './ProjectsTab';

function App() {
  return (
    <div className="App">
      <ProjectsTab 
        apiBaseUrl="/api"
        onProjectCreated={(project) => console.log('Project created:', project)}
        onError={(error) => console.error('Error:', error)}
      />
    </div>
  );
}
```

## API Integration

### Backend Requirements
The component expects a REST API with the following endpoint:

**POST** `/api/admin/projects`

### Request Body Structure
```json
{
  "title": "Beautiful House in DHA Phase 5",
  "description": "Spacious 5-bedroom house with modern amenities",
  "purpose": "sell",
  "propertyType": "home",
  "propertySubtype": "house",
  "city": "Lahore",
  "location": "DHA Phase 5",
  "areaSize": 10.5,
  "areaUnit": "marla",
  "price": 25000000,
  "currency": "PKR",
  "availableOnInstallments": false,
  "readyForPossession": true,
  "bedrooms": "5",
  "bathrooms": "4",
  "amenities": ["Parking Space", "Garden", "Security System"],
  "projectImages": ["image1.jpg", "image2.jpg"],
  "projectVideos": ["video1.mp4"],
  "youtubeLinks": ["https://youtube.com/watch?v=..."],
  "coverImage": "image1.jpg",
  "email": "contact@example.com",
  "mobile": "+923001234567",
  "landline": "+92421234567"
}
```

### Response Format
```json
{
  "id": 1,
  "title": "Beautiful House in DHA Phase 5",
  "description": "Spacious 5-bedroom house with modern amenities",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## Form Fields

### Required Fields
- **Title**: Property title/name
- **Description**: Detailed property description
- **Purpose**: Sell or Rent
- **Property Type**: Home, Plots, or Commercial
- **Property Subtype**: Specific property category
- **City**: Property location city
- **Location**: Specific area/neighborhood
- **Area Size**: Property dimensions
- **Price**: Property price
- **Email**: Contact email
- **Mobile**: Contact phone number

### Optional Fields
- **Available on Installments**: Boolean flag
- **Ready for Possession**: Boolean flag
- **Bedrooms**: Number of bedrooms
- **Bathrooms**: Number of bathrooms
- **Amenities**: Array of property features
- **Project Images**: Array of image files
- **Project Videos**: Array of video files
- **YouTube Links**: Array of YouTube URLs
- **Cover Image**: Primary image selection
- **Landline**: Additional contact number

## File Upload Features

### Image Uploads
- **Supported Formats**: JPG, JPEG, PNG
- **Maximum Size**: 5MB per file
- **Multiple Selection**: Upload multiple images at once
- **Cover Image**: Set one image as the primary/cover image

### Video Uploads
- **Supported Formats**: MP4, AVI, MOV, WMV
- **Maximum Size**: 50MB per file
- **Multiple Selection**: Upload multiple videos at once

### YouTube Integration
- **Link Validation**: Ensures valid YouTube URLs
- **Multiple Links**: Add multiple YouTube video links
- **Easy Management**: Add/remove links with simple interface

## Validation Rules

### Client-Side Validation
- **Required Fields**: Must not be empty
- **Email Format**: Valid email address format
- **Phone Numbers**: Non-empty mobile number
- **Area Size**: Must be positive number
- **Price**: Must be positive number

### File Validation
- **File Types**: Only specified formats allowed
- **File Sizes**: Within specified limits
- **Multiple Files**: Batch validation for uploads

## Styling

### CSS Classes
The component uses a comprehensive CSS system with:
- **Responsive Grid Layouts**: CSS Grid for flexible layouts
- **Modern Design Elements**: Shadows, borders, and transitions
- **Interactive States**: Hover effects and active states
- **Mobile-First Approach**: Responsive design patterns

### Customization
You can customize the appearance by:
- Modifying CSS variables
- Overriding specific class styles
- Adding custom themes
- Adjusting color schemes

## State Management

### Form State
```jsx
const [formData, setFormData] = useState({
  title: '',
  description: '',
  purpose: 'sell',
  propertyType: 'home',
  // ... other fields
});
```

### File State
```jsx
const [projectImages, setProjectImages] = useState([]);
const [projectVideos, setProjectVideos] = useState([]);
const [youtubeLinks, setYoutubeLinks] = useState([]);
```

### Validation State
```jsx
const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);
```

## Event Handlers

### Form Submission
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  
  // API call logic
  const response = await axios.post('/api/admin/projects', payload);
  // Handle response
};
```

### File Uploads
```jsx
const handleProjectImageUpload = (event) => {
  const files = Array.from(event.target.files);
  // File validation and processing
};
```

## Error Handling

### Validation Errors
- **Field-specific Errors**: Displayed below each field
- **Visual Indicators**: Red borders and error styling
- **User Feedback**: Clear error messages

### API Errors
- **Network Errors**: Connection and timeout handling
- **Server Errors**: HTTP error status handling
- **User Notifications**: Alert messages for errors

## Performance Features

### File Handling
- **Lazy Loading**: Images loaded on demand
- **File Size Optimization**: Efficient file size calculations
- **Memory Management**: Proper cleanup of file objects

### Form Optimization
- **Debounced Updates**: Efficient state updates
- **Conditional Rendering**: Only render necessary components
- **Memoization**: Optimized re-renders

## Browser Support

### Modern Browsers
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Features
- **ES6+ Support**: Modern JavaScript features
- **CSS Grid**: Modern layout system
- **File API**: File upload capabilities
- **Fetch API**: Modern HTTP requests

## Troubleshooting

### Common Issues

#### File Upload Not Working
- Check file size limits
- Verify supported file types
- Ensure proper file input setup

#### Form Validation Errors
- Check required field values
- Verify email format
- Ensure numeric fields have valid values

#### API Connection Issues
- Verify API endpoint URL
- Check network connectivity
- Ensure proper CORS configuration

### Debug Mode
Enable console logging for debugging:
```jsx
// Add to component for debugging
useEffect(() => {
  console.log('Form Data:', formData);
  console.log('Errors:', errors);
}, [formData, errors]);
```

## Contributing

### Development Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Make changes and test thoroughly

### Code Style
- Use consistent formatting
- Follow React best practices
- Add proper error handling
- Include comprehensive validation

## License

This component is provided as-is for educational and commercial use. Please ensure compliance with your project's licensing requirements.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Test with minimal setup
4. Provide detailed error information

---

**Note**: This component is designed to work with the HomeOn backend API. Ensure your backend implements the required endpoints and data structures for full functionality.
