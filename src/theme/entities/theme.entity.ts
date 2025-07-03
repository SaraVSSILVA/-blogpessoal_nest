import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../post/entities/post.entity';

@Entity({ name: 'tb_themes' })
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  description: string;

  // L15 - O decorator @OneToMany indica que a Classe Theme tem uma relação de um para muitos com a Classe Post.
  @OneToMany(() => Post, (post) => post.theme)
  post: Post[];
}
