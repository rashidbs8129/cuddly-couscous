import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { TailorService } from './tailor.service';
import { CreateTailorDto, UpdateTailorDto } from './dto/create-tailor.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Tailor')
@ApiBearerAuth('JWT-auth')
@Controller('tailors')
export class TailorController {
  constructor(private tailorService: TailorService) {}

  @Post('profile')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create tailor profile' })
  @ApiResponse({ status: 201, description: 'Tailor profile created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createTailorProfile(
    @Body() createTailorDto: CreateTailorDto,
    @Req() req: any,
  ) {
    return this.tailorService.createTailor(createTailorDto, req.user.id);
  }

  @Get('profile/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get tailor profile by ID' })
  @ApiParam({ name: 'id', description: 'Tailor UUID' })
  @ApiResponse({ status: 200, description: 'Tailor profile retrieved' })
  @ApiResponse({ status: 404, description: 'Tailor not found' })
  async getTailorProfile(@Param('id') id: string) {
    return this.tailorService.getTailor(id);
  }

  @Put('profile/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update tailor profile' })
  @ApiParam({ name: 'id', description: 'Tailor UUID' })
  @ApiResponse({ status: 200, description: 'Tailor profile updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Tailor not found' })
  async updateTailorProfile(
    @Param('id') id: string,
    @Body() updateTailorDto: UpdateTailorDto,
  ) {
    return this.tailorService.updateTailor(id, updateTailorDto);
  }

  @Delete('profile/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete tailor profile' })
  @ApiParam({ name: 'id', description: 'Tailor UUID' })
  @ApiResponse({ status: 200, description: 'Tailor profile deleted' })
  @ApiResponse({ status: 404, description: 'Tailor not found' })
  async deleteTailorProfile(@Param('id') id: string) {
    return this.tailorService.deleteTailor(id);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all tailors' })
  @ApiResponse({ status: 200, description: 'List of all tailors' })
  async getAllTailors() {
    return this.tailorService.getAllTailors();
  }

  @Get('stats/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get tailor statistics' })
  @ApiParam({ name: 'id', description: 'Tailor UUID' })
  @ApiResponse({ status: 200, description: 'Tailor statistics retrieved' })
  @ApiResponse({ status: 404, description: 'Tailor not found' })
  async getTailorStats(@Param('id') id: string) {
    return this.tailorService.getTailorStats(id);
  }
}
