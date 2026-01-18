import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../common/supabase.service';
import { SendOtpDto, VerifyOtpDto } from './dto/send-otp.dto';

@Injectable()
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  async sendOtp(sendOtpDto: SendOtpDto) {
    const { phoneNumber } = sendOtpDto;

    const supabase = this.supabaseService.getClient();

    // Send OTP using Supabase Auth
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
    });

    if (error) {
      throw new BadRequestException('Failed to send OTP: ' + error.message);
    }

    return {
      message: 'OTP sent successfully',
      data: {
        phoneNumber,
      },
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { phoneNumber, otp } = verifyOtpDto;

    const supabase = this.supabaseService.getClient();

    // Verify OTP using Supabase Auth
    const { data, error } = await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: otp,
      type: 'sms',
    });

    if (error) {
      throw new UnauthorizedException('Invalid OTP: ' + error.message);
    }

    return {
      message: 'Authentication successful',
      data: {
        user: data.user,
        session: data.session,
      },
    };
  }

  async signOut(token: string) {
    const supabase = this.supabaseService.getClient();

    // Set the session token
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new BadRequestException('Failed to sign out: ' + error.message);
    }

    return {
      message: 'Signed out successfully',
    };
  }
}
