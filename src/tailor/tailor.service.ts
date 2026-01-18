import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../common/supabase.service';
import { CreateTailorDto, UpdateTailorDto } from './dto/create-tailor.dto';

@Injectable()
export class TailorService {
  constructor(private supabaseService: SupabaseService) {}

  async createTailor(createTailorDto: CreateTailorDto, userId: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('tailors')
      .insert([
        {
          id: userId,
          name: createTailorDto.name,
          phone_number: createTailorDto.phoneNumber,
          email: createTailorDto.email || null,
          address: createTailorDto.address || null,
          shop_name: createTailorDto.shopName || null,
          specialization: createTailorDto.specialization || null,
          created_at: new Date(),
        },
      ])
      .select();

    if (error) {
      throw new BadRequestException(
        'Failed to create tailor profile: ' + error.message,
      );
    }

    return {
      message: 'Tailor profile created successfully',
      data: data[0],
    };
  }

  async getTailor(tailorId: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('tailors')
      .select('*')
      .eq('id', tailorId)
      .single();

    if (error) {
      throw new NotFoundException('Tailor not found');
    }

    return data;
  }

  async updateTailor(tailorId: string, updateTailorDto: UpdateTailorDto) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('tailors')
      .update({
        name: updateTailorDto.name,
        email: updateTailorDto.email,
        address: updateTailorDto.address,
        shop_name: updateTailorDto.shopName,
        specialization: updateTailorDto.specialization,
      })
      .eq('id', tailorId)
      .select();

    if (error) {
      throw new BadRequestException(
        'Failed to update tailor profile: ' + error.message,
      );
    }

    return {
      message: 'Tailor profile updated successfully',
      data: data[0],
    };
  }

  async deleteTailor(tailorId: string) {
    const supabase = this.supabaseService.getClient();

    const { error } = await supabase
      .from('tailors')
      .delete()
      .eq('id', tailorId);

    if (error) {
      throw new BadRequestException(
        'Failed to delete tailor profile: ' + error.message,
      );
    }

    return {
      message: 'Tailor profile deleted successfully',
    };
  }

  async getAllTailors() {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('tailors')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new BadRequestException(
        'Failed to fetch tailors: ' + error.message,
      );
    }

    return data;
  }

  async getTailorStats(tailorId: string) {
    const supabase = this.supabaseService.getClient();

    const { data: measurements, error: measurementError } = await supabase
      .from('measurements')
      .select('*', { count: 'exact' })
      .eq('tailor_id', tailorId);

    if (measurementError) {
      throw new BadRequestException(
        'Failed to fetch tailor stats: ' + measurementError.message,
      );
    }

    return {
      totalMeasurements: measurements?.length || 0,
      data: measurements,
    };
  }
}
