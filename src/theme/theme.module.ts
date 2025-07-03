import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from './entities/theme.entity';
import { ThemeService } from './services/theme.services';
@Module({
  imports: [TypeOrmModule.forFeature([Theme])],
  providers: [ThemeService],
  controllers: [],
  exports: [ThemeService],
})
export class ThemeModule {}
