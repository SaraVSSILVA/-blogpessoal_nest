import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Theme } from '../entities/theme.entity';
import { ThemeService } from '../services/theme.services';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Theme')
@UseGuards(JwtAuthGuard)
@Controller('/themes')
@ApiBearerAuth()
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Theme[]> {
    return this.themeService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Theme> {
    return this.themeService.findById(id);
  }

  @Get('/description/:description')
  @HttpCode(HttpStatus.OK)
  findAllBydescription(
    @Param('description') description: string,
  ): Promise<Theme[]> {
    return this.themeService.findAllByDescription(description);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() theme: Theme): Promise<Theme> {
    return this.themeService.create(theme);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() theme: Theme): Promise<Theme> {
    return this.themeService.update(theme);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.themeService.delete(id);
  }
}
