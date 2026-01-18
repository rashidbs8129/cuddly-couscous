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
import { MeasurementsService } from './measurements.service';
import {
  CreateMeasurementDto,
  UpdateMeasurementDto,
} from './dto/create-measurement.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('measurements')
export class MeasurementsController {
  constructor(private measurementsService: MeasurementsService) {}

  @Post()
  @UseGuards(AuthGuard)
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
  async getMeasurementsByUser(@Param('userId') userId: string) {
    return this.measurementsService.getMeasurementsByUser(userId);
  }

  @Get('tailor/:tailorId')
  @UseGuards(AuthGuard)
  async getMeasurementsByTailor(@Param('tailorId') tailorId: string) {
    return this.measurementsService.getMeasurementsByTailor(tailorId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getMeasurement(@Param('id') id: string) {
    return this.measurementsService.getMeasurement(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateMeasurement(
    @Param('id') id: string,
    @Body() updateMeasurementDto: UpdateMeasurementDto,
  ) {
    return this.measurementsService.updateMeasurement(id, updateMeasurementDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteMeasurement(@Param('id') id: string) {
    return this.measurementsService.deleteMeasurement(id);
  }
}
