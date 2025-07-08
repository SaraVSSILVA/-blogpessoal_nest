import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_themes' })
export class Theme {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  description: string;

  // L16 - O decorator @OneToMany indica que a Classe Theme tem uma relação de um para muitos com a Classe Post.
  @ApiProperty()
  @OneToMany(() => Post, (post) => post.theme)
  post: Post[];
}
