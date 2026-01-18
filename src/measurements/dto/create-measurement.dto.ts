import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMeasurementDto {
  @ApiProperty({ description: 'User UUID', example: 'user-uuid-here' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Type of measurement (chest, waist, sleeve, length, shoulder, hip, neck, inseam)',
    example: 'chest',
  })
  @IsNotEmpty()
  @IsString()
  measurementType: string;

  @ApiProperty({ description: 'Measurement value', example: 42.5 })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty({ description: 'Unit of measurement (cm, inches)', example: 'cm', required: false })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiProperty({ description: 'Additional notes about the measurement', example: 'Standard fit', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateMeasurementDto {
  @ApiProperty({ description: 'Updated measurement value', example: 43.0, required: false })
  @IsOptional()
  @IsNumber()
  value?: number;

  @ApiProperty({ description: 'Unit of measurement', example: 'cm', required: false })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiProperty({ description: 'Additional notes', example: 'Updated measurement', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
