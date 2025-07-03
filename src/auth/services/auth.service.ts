import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UserLogin } from '../entities/userlogin.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const searchUser = await this.userService.findByUser(username);

    if (!searchUser)
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    const matchPassword = await this.bcrypt.comparePassword(
      password,
      searchUser.password,
    );

    if (searchUser && matchPassword) {
      const { password, ...answer } = searchUser;
      return answer;
    }

    return null;
  }

  async login(userLogin: UserLogin) {
    const payload = { sub: userLogin.user };

    const searchUser = await this.userService.findByUser(userLogin.user);

    if (!searchUser) {
      throw new HttpException('User not found!', HttpStatus.UNAUTHORIZED);
    }

    return {
      id: searchUser.id,
      nome: searchUser.name,
      user: userLogin.user,
      senha: '',
      foto: searchUser.photo,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
