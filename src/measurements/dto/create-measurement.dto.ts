import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateMeasurementDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  measurementType: string; // chest, waist, sleeve, length, etc.

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsOptional()
  @IsString()
  unit?: string; // cm, inches

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateMeasurementDto {
  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
