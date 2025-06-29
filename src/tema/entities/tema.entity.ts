import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Postagem } from '../../postagem/entities/postagem.entity';

@Entity({ name: 'tb_temas' })
export class Tema {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  descricao: string;

  // L15 - O decorator @OneToMany indica que a Classe Tema tem uma relação de um para muitos com a Classe Postagem.
  @OneToMany(() => Postagem, (postagem) => postagem.tema)
  postagem: Postagem[];
}
