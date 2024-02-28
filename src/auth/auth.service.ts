import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserInfor } from './dto/user-infor.dto';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { JwtPayload } from './types';
import { Tokens } from './types/tokens.type';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import hashPassword from 'src/utils/hashPassword';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

const convertToUserInfor = (user: any): UserInfor => ({
  id: user._id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  grade: user.grade,
  gender: user.gender,
  DOB: user.DOB,
  avatar: user.avatar,
  role: user.role,
  address: user.address,
  phone: user.phone,
  isLock: user.isLock,
});
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly httpService: HttpService
  ) { }

  async loginOtherServiceProvider(req: any): Promise<any> {
    if (!req.user) {
      return 'No user from this service provider';
    }
    const user = await this.usersService.findOne(req.user.email);
    if (!user) {
      const newUser = await this.usersService.createUser({
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        avatar: req.user.picture,
        password: 'abcd123456',
        role: 'Student',
      });
      const tokens = await this.getTokens(newUser._id, newUser.email);
      await this.updateRtHash(newUser._id, tokens.refresh_token);
      const userInfor: UserInfor = convertToUserInfor(newUser);
      return { tokens, user: userInfor };
    }
    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRtHash(user._id, tokens.refresh_token);
    const userInfor: UserInfor = convertToUserInfor(user);
    return { tokens, user: userInfor };
  }

  async loginOtherServiceProviderMobile(accessToken: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://www.googleapis.com/userinfo/v2/me', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }))
      console.log(response.data)
      const user = response.data;
      const existedUser = await this.usersService.findOne(user.email);
      if (existedUser) {
        const tokens = await this.getTokens(existedUser._id, existedUser.email);
        await this.updateRtHash(existedUser._id, tokens.refresh_token);
        const userInfor: UserInfor = convertToUserInfor(existedUser);
        return { tokens, user: userInfor };
      }
      const newUser = await this.usersService.createUser({
        email: user.email,
        firstName: user.family_name,
        lastName: user.given_name,
        avatar: user.picture,
        password: 'abcd123456',
        role: 'Student',
      });
      const tokens = await this.getTokens(newUser._id, newUser.email);
      await this.updateRtHash(newUser._id, tokens.refresh_token);
      const userInfor: UserInfor = convertToUserInfor(newUser);
      return { tokens, user: userInfor };
    }
    catch (error) {
      throw new ForbiddenException('Invalid access token');
    }
  };
  async loginFacebookMobile(accessToken: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://graph.facebook.com/me`, {
          params: {
            fields: 'id,first_name,last_name,email,picture',
            access_token: accessToken,
          },
        })
      )
      console.log(response.data)
      const user = response.data;
      const existedUser = await this.usersService.findOne(user.email);
      if (existedUser) {
        const tokens = await this.getTokens(existedUser._id, existedUser.email);
        await this.updateRtHash(existedUser._id, tokens.refresh_token);
        const userInfor: UserInfor = convertToUserInfor(existedUser);
        return { tokens, user: userInfor };
      }
      const newUser = await this.usersService.createUser({
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        avatar: user.picture?.data?.url,
        password: 'abcd123456',
        role: 'Student',
      });
      const tokens = await this.getTokens(newUser._id, newUser.email);
      await this.updateRtHash(newUser._id, tokens.refresh_token);
      const userInfor: UserInfor = convertToUserInfor(newUser);
      return { tokens, user: userInfor };
    }
    catch (error) {
      throw new ForbiddenException('Invalid access token');
    }
  };
  async signupLocal(
    dto: CreateUserDto,
  ): Promise<{ tokens: Tokens; user: UserInfor; status: string }> {
    const { email, password, role, firstName, lastName } = dto;
    const hash = await hashPassword(password);
    const existedUser = await this.usersService.findOne(email);
    if (existedUser) throw new BadRequestException('Email already exists');
    const user = await this.usersService
      .createUser({
        email,
        password: hash,
        role,
        firstName,
        lastName,
      })
      .catch((error) => {
        throw error;
      });

    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRtHash(user._id, tokens.refresh_token);
    const userInfor: UserInfor = convertToUserInfor(user);
    return { tokens, user: userInfor, status: 'success' };
  }

  async signinLocal(
    dto: AuthDto,
  ): Promise<{ tokens: Tokens; user: UserInfor; status: string }> {
    const { email, password, role } = dto;
    const user = await this.usersService.findOne(email);
    if (!user) throw new ForbiddenException('Access Denied');
    if (role != user.role) throw new ForbiddenException('Access Denied');

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRtHash(user._id, tokens.refresh_token);
    const userInfor: UserInfor = convertToUserInfor(user);
    return { tokens, user: userInfor, status: 'success' };
  }

  async logout(userId: string): Promise<boolean> {
    await this.usersService.resetRefreshToken(userId);
    return true;
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = (await this.usersService.getUserById(userId)) as any;
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(rt, user.refreshToken);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRtHash(user._id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await bcrypt.hash(rt, 12);
    await this.usersService.updateRefreshToken(userId, hash);
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.AT_SECRET, //this.config.get<string>(''),
        expiresIn: process.env.AT_SECRET_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.RT_SECRET, //this.config.get<string>(''),
        expiresIn: process.env.RT_SECRET_TIME,
      }),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
