import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SendOtpDto, VerifyOtpDto } from './dto/send-otp.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('send-otp')
  @ApiOperation({ summary: 'Send OTP to phone number' })
  @ApiResponse({
    status: 200,
    description: 'OTP sent successfully',
    schema: {
      example: {
        message: 'OTP sent successfully',
        data: { phoneNumber: '+919876543210' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid phone number or OTP send failed' })
  async sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendOtp(sendOtpDto);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP and get access token' })
  @ApiResponse({
    status: 200,
    description: 'Authentication successful',
    schema: {
      example: {
        message: 'Authentication successful',
        data: {
          user: { id: 'user-uuid', phone: '+919876543210' },
          session: { access_token: 'jwt-token', expires_in: 3600 },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid OTP' })
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @Post('sign-out')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Sign out user' })
  @ApiResponse({
    status: 200,
    description: 'Signed out successfully',
    schema: { example: { message: 'Signed out successfully' } },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async signOut(@Req() req: any) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.authService.signOut(token);
  }
}
