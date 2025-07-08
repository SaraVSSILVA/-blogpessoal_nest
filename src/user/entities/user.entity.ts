import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity({ name: 'tb_users' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  name: string;
  

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  user: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  password: string;

  @Column({ length: 5000 })
  @ApiProperty()
  photo: string;

  @ApiProperty()
  @OneToMany(() => Post, (post) => post.user)
  post: Post[];
}
