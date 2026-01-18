import { Module } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { MeasurementsController } from './measurements.controller';
import { SupabaseService } from '../common/supabase.service';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  providers: [MeasurementsService, SupabaseService, AuthGuard],
  controllers: [MeasurementsController],
  exports: [MeasurementsService],
})
export class MeasurementsModule {}
