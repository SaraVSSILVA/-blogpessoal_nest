import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from '../entities/theme.entity';
import { ThemeService } from './theme.services';
import { ThemeController } from '../controllers/theme.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Theme])],
  providers: [ThemeService],
  controllers: [ThemeController],
  exports: [ThemeService],
})
export class ThemeModule {}
