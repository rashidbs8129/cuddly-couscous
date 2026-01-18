import { IsPhoneNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Phone number in international format', example: '+919876543210' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({ description: 'User full name', example: 'Jane Smith', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Email address', example: 'jane@example.com', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ description: 'Home address', example: '456 Oak Ave', required: false })
  @IsOptional()
  @IsString()
  address?: string;
}

export class UpdateUserDto {
  @ApiProperty({ description: 'User full name', example: 'Jane Smith', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Email address', example: 'jane@example.com', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ description: 'Home address', example: '456 Oak Ave', required: false })
  @IsOptional()
  @IsString()
  address?: string;
}
