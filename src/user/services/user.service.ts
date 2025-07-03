import { User } from '../entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private bcrypt: Bcrypt,
  ) {}

  async findByUser(user: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        user: user,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    return user;
  }

  async create(user: User): Promise<User> {
    const searchUser = await this.findByUser(user.user);

    if (searchUser)
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);

    user.password = await this.bcrypt.encryptPassword(user.password);
    return await this.userRepository.save(user);
  }

  async update(user: User): Promise<User> {
    await this.findById(user.id);

    const searchUser = await this.findByUser(user.user);

    if (searchUser && searchUser.id !== user.id)
      throw new HttpException(
        'User (email) already registered!',
        HttpStatus.BAD_REQUEST,
      );

    user.password = await this.bcrypt.encryptPassword(user.password);
    return await this.userRepository.save(user);
  }
}
