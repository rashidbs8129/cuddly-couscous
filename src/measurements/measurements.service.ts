import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../common/supabase.service';
import {
  CreateMeasurementDto,
  UpdateMeasurementDto,
} from './dto/create-measurement.dto';

@Injectable()
export class MeasurementsService {
  constructor(private supabaseService: SupabaseService) {}

  async createMeasurement(
    createMeasurementDto: CreateMeasurementDto,
    tailorId: string,
  ) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('measurements')
      .insert([
        {
          tailor_id: tailorId,
          user_id: createMeasurementDto.userId,
          measurement_type: createMeasurementDto.measurementType,
          value: createMeasurementDto.value,
          unit: createMeasurementDto.unit || 'cm',
          notes: createMeasurementDto.notes || null,
          created_at: new Date(),
        },
      ])
      .select();

    if (error) {
      throw new BadRequestException(
        'Failed to create measurement: ' + error.message,
      );
    }

    return {
      message: 'Measurement created successfully',
      data: data[0],
    };
  }

  async getMeasurement(measurementId: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('measurements')
      .select('*')
      .eq('id', measurementId)
      .single();

    if (error) {
      throw new NotFoundException('Measurement not found');
    }

    return data;
  }

  async getMeasurementsByUser(userId: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('measurements')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new BadRequestException(
        'Failed to fetch measurements: ' + error.message,
      );
    }

    return data;
  }

  async getMeasurementsByTailor(tailorId: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('measurements')
      .select('*')
      .eq('tailor_id', tailorId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new BadRequestException(
        'Failed to fetch measurements: ' + error.message,
      );
    }

    return data;
  }

  async updateMeasurement(
    measurementId: string,
    updateMeasurementDto: UpdateMeasurementDto,
  ) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('measurements')
      .update({
        value: updateMeasurementDto.value,
        unit: updateMeasurementDto.unit,
        notes: updateMeasurementDto.notes,
      })
      .eq('id', measurementId)
      .select();

    if (error) {
      throw new BadRequestException(
        'Failed to update measurement: ' + error.message,
      );
    }

    return {
      message: 'Measurement updated successfully',
      data: data[0],
    };
  }

  async deleteMeasurement(measurementId: string) {
    const supabase = this.supabaseService.getClient();

    const { error } = await supabase
      .from('measurements')
      .delete()
      .eq('id', measurementId);

    if (error) {
      throw new BadRequestException(
        'Failed to delete measurement: ' + error.message,
      );
    }

    return {
      message: 'Measurement deleted successfully',
    };
  }
}
