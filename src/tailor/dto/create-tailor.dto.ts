import { IsNotEmpty, IsString, IsOptional, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTailorDto {
  @ApiProperty({ description: 'Tailor full name', example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Phone number in international format', example: '+919876543210' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({ description: 'Email address', example: 'john@example.com', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ description: 'Shop address', example: '123 Main St', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'Shop name', example: "John's Tailoring", required: false })
  @IsOptional()
  @IsString()
  shopName?: string;

  @ApiProperty({ description: 'Specialization (suits, dresses, etc.)', example: 'suits', required: false })
  @IsOptional()
  @IsString()
  specialization?: string;
}

export class UpdateTailorDto {
  @ApiProperty({ description: 'Tailor full name', example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Email address', example: 'john@example.com', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ description: 'Shop address', example: '123 Main St', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'Shop name', example: "John's Tailoring", required: false })
  @IsOptional()
  @IsString()
  shopName?: string;

  @ApiProperty({ description: 'Specialization', example: 'suits', required: false })
  @IsOptional()
  @IsString()
  specialization?: string;
}
