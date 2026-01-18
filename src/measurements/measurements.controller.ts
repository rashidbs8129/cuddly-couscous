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
import { MeasurementsService } from './measurements.service';
import {
  CreateMeasurementDto,
  UpdateMeasurementDto,
} from './dto/create-measurement.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Measurements')
@ApiBearerAuth('JWT-auth')
@Controller('measurements')
export class MeasurementsController {
  constructor(private measurementsService: MeasurementsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new measurement' })
  @ApiResponse({ status: 201, description: 'Measurement created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createMeasurement(
    @Body() createMeasurementDto: CreateMeasurementDto,
    @Req() req: any,
  ) {
    return this.measurementsService.createMeasurement(
      createMeasurementDto,
      req.user.id,
    );
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all measurements for a user' })
  @ApiParam({ name: 'userId', description: 'User UUID' })
  @ApiResponse({ status: 200, description: 'List of user measurements' })
  async getMeasurementsByUser(@Param('userId') userId: string) {
    return this.measurementsService.getMeasurementsByUser(userId);
  }

  @Get('tailor/:tailorId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all measurements created by a tailor' })
  @ApiParam({ name: 'tailorId', description: 'Tailor UUID' })
  @ApiResponse({ status: 200, description: 'List of tailor measurements' })
  async getMeasurementsByTailor(@Param('tailorId') tailorId: string) {
    return this.measurementsService.getMeasurementsByTailor(tailorId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get a specific measurement' })
  @ApiParam({ name: 'id', description: 'Measurement UUID' })
  @ApiResponse({ status: 200, description: 'Measurement retrieved' })
  @ApiResponse({ status: 404, description: 'Measurement not found' })
  async getMeasurement(@Param('id') id: string) {
    return this.measurementsService.getMeasurement(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update a measurement' })
  @ApiParam({ name: 'id', description: 'Measurement UUID' })
  @ApiResponse({ status: 200, description: 'Measurement updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async updateMeasurement(
    @Param('id') id: string,
    @Body() updateMeasurementDto: UpdateMeasurementDto,
  ) {
    return this.measurementsService.updateMeasurement(id, updateMeasurementDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete a measurement' })
  @ApiParam({ name: 'id', description: 'Measurement UUID' })
  @ApiResponse({ status: 200, description: 'Measurement deleted' })
  @ApiResponse({ status: 404, description: 'Measurement not found' })
  async deleteMeasurement(@Param('id') id: string) {
    return this.measurementsService.deleteMeasurement(id);
  }
}
