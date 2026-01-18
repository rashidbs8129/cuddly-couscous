import { Module } from '@nestjs/common';
import { TailorService } from './tailor.service';
import { TailorController } from './tailor.controller';
import { SupabaseService } from '../common/supabase.service';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  providers: [TailorService, SupabaseService, AuthGuard],
  controllers: [TailorController],
  exports: [TailorService],
})
export class TailorModule {}
