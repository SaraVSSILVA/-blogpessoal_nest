import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private _usernameField: string;
  private _passwordField: string;

  constructor(private readonly authService: AuthService) {
    super();
    this._usernameField = 'user';
    this._passwordField = 'password';
  }

  async validate(user: string, password: string): Promise<any> {
    const validaUser = await this.authService.validateUser(user, password);
    if (!validaUser) {
      throw new UnauthorizedException('Incorrect username and/or password!');
    }
    return validaUser;
  }
}
