import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { SupabaseService } from '../common/supabase.service';

@Module({
  providers: [AuthService, AuthGuard, SupabaseService],
  controllers: [AuthController],
  exports: [AuthGuard],
})
export class AuthModule {}
