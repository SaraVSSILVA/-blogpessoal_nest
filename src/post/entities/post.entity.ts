import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Theme } from '../../theme/entities/theme.entity';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity({ name: 'tb_posts' })
export class Post {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  text: string;

  @ApiProperty()
  @UpdateDateColumn()
  date: Date;

  // O decorator @ManyToOne indica que a Classe Post tem uma relação de muitos para um com a Classe Theme.
  @ApiProperty({ type: () => Theme })
  @ManyToOne(() => Theme, (theme) => theme.post, {
    onDelete: 'CASCADE',
  })
  theme: Theme;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.post, {
    onDelete: 'CASCADE',
  })
  user: User;
}
