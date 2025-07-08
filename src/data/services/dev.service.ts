import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Post } from '../../post/entities/post.entity';
import { Theme } from '../../theme/entities/theme.entity';
import { User } from '../../user/entities/user.entity';
@Injectable()
export class DevService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      entities: [Post, Theme, User],
      synchronize: true,
    };
  }
}
