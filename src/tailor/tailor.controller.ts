import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TailorService } from './tailor.service';
import { CreateTailorDto, UpdateTailorDto } from './dto/create-tailor.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tailors')
export class TailorController {
  constructor(private tailorService: TailorService) {}

  @Post('profile')
  @UseGuards(AuthGuard)
  async createTailorProfile(
    @Body() createTailorDto: CreateTailorDto,
    @Req() req: any,
  ) {
    return this.tailorService.createTailor(createTailorDto, req.user.id);
  }

  @Get('profile/:id')
  @UseGuards(AuthGuard)
  async getTailorProfile(@Param('id') id: string) {
    return this.tailorService.getTailor(id);
  }

  @Put('profile/:id')
  @UseGuards(AuthGuard)
  async updateTailorProfile(
    @Param('id') id: string,
    @Body() updateTailorDto: UpdateTailorDto,
  ) {
    return this.tailorService.updateTailor(id, updateTailorDto);
  }

  @Delete('profile/:id')
  @UseGuards(AuthGuard)
  async deleteTailorProfile(@Param('id') id: string) {
    return this.tailorService.deleteTailor(id);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllTailors() {
    return this.tailorService.getAllTailors();
  }

  @Get('stats/:id')
  @UseGuards(AuthGuard)
  async getTailorStats(@Param('id') id: string) {
    return this.tailorService.getTailorStats(id);
  }
}
