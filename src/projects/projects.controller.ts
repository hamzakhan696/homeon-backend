import { Controller, Get, Post, Body, Param, Put, Delete, UploadedFiles, UseInterceptors, Patch, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('projects')
@Controller('projects')
export class PublicProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Post()
  submit(@Body() dto: CreateProjectDto) {
    return this.service.create(dto);
  }

  @Post('create-with-media')
  @ApiOperation({ summary: 'Public submit project with media (multipart)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 30, {
    limits: { fileSize: 50 * 1024 * 1024 },
  }))
  submitWithMedia(@Body() dto: CreateProjectDto, @UploadedFiles() files: any[]) {
    return this.service.createWithUploads(dto, files);
  }

  @Get()
  listApproved() {
    return this.service.findAll('approved');
  }
}

@Controller('admin/projects')
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new project',
    description: 'Create a new real estate project with all details including property information, pricing, amenities, and media uploads.'
  })
  @ApiConsumes('application/json')
  @ApiBody({ 
    type: CreateProjectDto,
    description: 'Project creation data',
    examples: {
      example1: {
        summary: 'Basic House Project',
        description: 'A complete example of creating a house project',
        value: {
          title: 'Beautiful House in DHA Phase 5',
          description: 'Spacious 5-bedroom house with modern amenities in a prime location',
          purpose: 'sell',
          propertyType: 'home',
          propertySubtype: 'house',
          city: 'Lahore',
          location: 'DHA Phase 5',
          areaSize: 10.5,
          areaUnit: 'marla',
          price: 25000000,
          currency: 'PKR',
          availableOnInstallments: false,
          readyForPossession: true,
          bedrooms: '5',
          bathrooms: '4',
          amenities: ['Parking Space', 'Garden', 'Security System', 'Swimming Pool'],
          projectImages: ['house_front.jpg', 'house_interior.jpg'],
          projectVideos: ['house_tour.mp4'],
          youtubeLinks: ['https://youtube.com/watch?v=example'],
          coverImage: 'house_front.jpg',
          email: 'contact@example.com',
          mobile: '+923001234567',
          landline: '+92421234567'
        }
      },
      example2: {
        summary: 'Commercial Property',
        description: 'Example of creating a commercial property project',
        value: {
          title: 'Prime Office Space in Gulberg',
          description: 'Modern office space with excellent facilities and location',
          purpose: 'rent',
          propertyType: 'commercial',
          propertySubtype: 'office',
          city: 'Lahore',
          location: 'Gulberg III',
          areaSize: 5000,
          areaUnit: 'sq_ft',
          price: 150000,
          currency: 'PKR',
          availableOnInstallments: false,
          readyForPossession: true,
          amenities: ['Parking Space', 'Security System', 'Elevator', 'Air Conditioning'],
          projectImages: ['office_front.jpg', 'office_interior.jpg'],
          email: 'office@example.com',
          mobile: '+923001234567'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Project created successfully',
    type: CreateProjectDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - validation failed'
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Internal server error'
  })
  create(@Body() dto: CreateProjectDto) {
    return this.service.create(dto);
  }

 @Post('create-with-media')
  @ApiOperation({ summary: 'Create project with media uploads (multipart)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 30, {
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter: (req, file, cb) => {
      const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'video/avi', 'video/mov', 'video/wmv'];
      if (allowed.includes(file.mimetype)) cb(null, true);
      else cb(null, false);
    },
  }))
  async createWithMedia(@Body() dto: CreateProjectDto, @UploadedFiles() files: any[]) {
    return this.service.createWithUploads(dto, files);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all projects',
    description: 'Retrieve a list of all projects'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Projects retrieved successfully',
    type: [CreateProjectDto]
  })
  findAll(@Query('status') status?: string) {
    return this.service.findAll(status);
  }
  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve a pending project' })
  approve(@Param('id') id: string) {
    return this.service.setStatus(+id, 'approved');
  }

  @Patch(':id/reject')
  @ApiOperation({ summary: 'Reject a pending project' })
  reject(@Param('id') id: string) {
    return this.service.setStatus(+id, 'rejected');
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get project by ID',
    description: 'Retrieve a specific project by its ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Project ID',
    example: '1'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Project retrieved successfully',
    type: CreateProjectDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Project not found'
  })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Get('search/query')
  @ApiOperation({ summary: 'Search projects with filters' })
  search(@Body() _unused: any) {
    // Not used; GET with query params read in service via request injection isn't set up.
    // Keep method signature minimal; frontend will call the below POST for flexibility.
    return this.service.findAll();
  }

  @Post('search')
  @ApiOperation({ summary: 'Search projects (POST with JSON filters)' })
  searchPost(@Body() filters: any) {
    return this.service.search({
      city: filters.city,
      location: filters.location,
      propertyType: filters.propertyType,
      bedrooms: filters.bedrooms,
      minPrice: typeof filters.minPrice === 'number' ? filters.minPrice : undefined,
      maxPrice: typeof filters.maxPrice === 'number' ? filters.maxPrice : undefined,
      minArea: typeof filters.minArea === 'number' ? filters.minArea : undefined,
      maxArea: typeof filters.maxArea === 'number' ? filters.maxArea : undefined,
    });
  }

  @Put(':id')
  @ApiOperation({ 
    summary: 'Update project',
    description: 'Update an existing project by ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Project ID',
    example: '1'
  })
  @ApiBody({ 
    type: UpdateProjectDto,
    description: 'Project update data'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Project updated successfully',
    type: CreateProjectDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Project not found'
  })
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.service.update(+id, dto);
  }

  @Put(':id/update-with-media')
  @ApiOperation({ summary: 'Update project with media uploads (multipart)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 30, {
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'video/avi', 'video/mov', 'video/wmv'];
      if (allowed.includes(file.mimetype)) cb(null, true);
      else cb(null, false);
    },
  }))
  async updateWithMedia(@Param('id') id: string, @Body() dto: UpdateProjectDto, @UploadedFiles() files: any[]) {
    return this.service.updateWithUploads(+id, dto, files);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete project',
    description: 'Delete a project by ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Project ID',
    example: '1'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Project deleted successfully'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Project not found'
  })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}