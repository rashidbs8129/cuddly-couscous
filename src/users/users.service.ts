import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../common/supabase.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private supabaseService: SupabaseService) {}

  async createUser(createUserDto: CreateUserDto, userId: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id: userId,
          phone_number: createUserDto.phoneNumber,
          name: createUserDto.name || null,
          email: createUserDto.email || null,
          address: createUserDto.address || null,
          created_at: new Date(),
        },
      ])
      .select();

    if (error) {
      throw new BadRequestException('Failed to create user: ' + error.message);
    }

    return {
      message: 'User created successfully',
      data: data[0],
    };
  }

  async getUser(userId: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new NotFoundException('User not found');
    }

    return data;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('users')
      .update({
        name: updateUserDto.name,
        email: updateUserDto.email,
        address: updateUserDto.address,
      })
      .eq('id', userId)
      .select();

    if (error) {
      throw new BadRequestException('Failed to update user: ' + error.message);
    }

    return {
      message: 'User updated successfully',
      data: data[0],
    };
  }

  async deleteUser(userId: string) {
    const supabase = this.supabaseService.getClient();

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) {
      throw new BadRequestException('Failed to delete user: ' + error.message);
    }

    return {
      message: 'User deleted successfully',
    };
  }

  async getAllUsers() {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase.from('users').select('*');

    if (error) {
      throw new BadRequestException('Failed to fetch users: ' + error.message);
    }

    return data;
  }
}
