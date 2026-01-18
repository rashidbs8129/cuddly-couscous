import { IsPhoneNumber, IsNotEmpty, MinLength } from 'class-validator';

export class SendOtpDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}

export class VerifyOtpDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsNotEmpty()
  @MinLength(6)
  otp: string;
}
