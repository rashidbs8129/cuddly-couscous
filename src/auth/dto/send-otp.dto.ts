import { IsPhoneNumber, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendOtpDto {
  @ApiProperty({
    description: 'Phone number in international format (e.g., +919876543210)',
    example: '+919876543210',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}

export class VerifyOtpDto {
  @ApiProperty({
    description: 'Phone number in international format',
    example: '+919876543210',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({
    description: 'OTP sent to the phone number (6 digits)',
    example: '123456',
  })
  @IsNotEmpty()
  @MinLength(6)
  otp: string;
}
