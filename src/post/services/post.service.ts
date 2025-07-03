import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { ThemeService } from '../../theme/services/theme.services';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private themeService: ThemeService,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({
      relations: {
        theme: true,
        user: true,
      },
    });
  }

  async findById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: {
        id,
      },
      relations: {
        theme: true,
        user: true,
      },
    });

    if (!post) throw new HttpException('Post not found!', HttpStatus.NOT_FOUND);

    return post;
  }

  async findAllByTitle(title: string): Promise<Post[]> {
    return await this.postRepository.find({
      where: {
        title: ILike(`%${title}%`),
      },
      relations: {
        theme: true,
        user: true,
      },
    });
  }

  async create(post: Post): Promise<Post> {
    await this.themeService.findById(post.theme.id);

    return await this.postRepository.save(post);
  }

  async update(post: Post): Promise<Post> {
    await this.findById(post.id);

    await this.themeService.findById(post.theme.id);

    return await this.postRepository.save(post);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.postRepository.delete(id);
  }
}
