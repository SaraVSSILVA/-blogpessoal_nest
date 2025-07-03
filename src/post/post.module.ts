import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeModule } from '../theme/theme.module';
import { Post } from './entities/post.entity';
import { PostService } from './services/post.service';
import { PostController } from './controllers/post.controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), ThemeModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [],
})
export class PostModule {}
