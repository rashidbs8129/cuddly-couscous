import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SupabaseService } from '../common/supabase.service';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  providers: [UsersService, SupabaseService, AuthGuard],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
