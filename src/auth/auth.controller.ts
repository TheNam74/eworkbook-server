// import { UserDocument } from './../users/schemas/users.schema';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Response,
  Req,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public, GetCurrentUserId, GetCurrentUser } from '../common/decorators';
import { AtGuard, RtGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';
import { UserInfor } from './dto/user-infor.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { accessTokenConfig, refreshTokenConfig } from 'src/utils/cookieConfig';
import { MobileGoogleAuthDto } from './dto/mobile-google-auth.dto';
@Controller('auth')
@ApiTags('Local Auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Public()
  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async googleLogin(@Req() req, @Response() res): Promise<any> {
    const authInfor = await this.authService.loginOtherServiceProvider(req);
    res.cookie(
      'access_token',
      authInfor.tokens.access_token,
      accessTokenConfig,
    );
    res.cookie(
      'refresh_token',
      authInfor.tokens.refresh_token,
      refreshTokenConfig,
    );
    return res.status(200).redirect(process.env.CLIENT_URL);
  }

  @Public()
  @Post('google/mobile/login')
  async googleMobileLogin(
    @Body() dto: MobileGoogleAuthDto,
    @Response() res,
  ): Promise<any> {
    const authInfor = await this.authService.loginOtherServiceProviderMobile(
      dto.accessToken,
    );
    res.cookie(
      'access_token',
      authInfor.tokens.access_token,
      accessTokenConfig,
    );
    res.cookie(
      'refresh_token',
      authInfor.tokens.refresh_token,
      refreshTokenConfig,
    );
    return res.status(200).send(authInfor.user);
  }
  @Public()
  @Post('facebook/mobile/login')
  async facebookMobileLogin(
    @Body() dto: MobileGoogleAuthDto,
    @Response() res,
  ): Promise<any> {
    const authInfor = await this.authService.loginFacebookMobile(
      dto.accessToken,
    );
    res.cookie(
      'access_token',
      authInfor.tokens.access_token,
      accessTokenConfig,
    );
    res.cookie(
      'refresh_token',
      authInfor.tokens.refresh_token,
      refreshTokenConfig,
    );
    return res.status(200).send(authInfor.user);
  }
  @Public()
  @Get('facebook/login')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(@Req() req, @Response() res): Promise<any> {
    const authInfor = await this.authService.loginOtherServiceProvider(req);
    res.cookie(
      'access_token',
      authInfor.tokens.access_token,
      accessTokenConfig,
    );
    res.cookie(
      'refresh_token',
      authInfor.tokens.refresh_token,
      refreshTokenConfig,
    );
    return res.status(200).redirect(process.env.CLIENT_URL);
  }
  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(
    @Body() dto: CreateUserDto,
    @Response() res,
  ): Promise<Tokens> {
    const authInfor = await this.authService.signupLocal(dto);
    res.cookie(
      'access_token',
      authInfor.tokens.access_token,
      accessTokenConfig,
    );
    res.cookie(
      'refresh_token',
      authInfor.tokens.refresh_token,
      refreshTokenConfig,
    );
    return res.status(200).send(authInfor.user);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Body() dto: AuthDto, @Response() res): Promise<UserInfor> {
    const authInfor = await this.authService.signinLocal(dto);
    res.cookie(
      'access_token',
      authInfor.tokens.access_token,
      accessTokenConfig,
    );
    res.cookie(
      'refresh_token',
      authInfor.tokens.refresh_token,
      refreshTokenConfig,
    );
    return res.status(200).send(authInfor.user);
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @GetCurrentUserId() userId: string,
    @Response() res,
  ): Promise<any> {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    await this.authService.logout(userId);
    return res.send('Logout successfully');
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Response() res,
  ): Promise<Tokens> {
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    res.cookie('access_token', tokens.access_token, accessTokenConfig);
    res.cookie('refresh_token', tokens.refresh_token, refreshTokenConfig);
    return res.send(tokens);
  }
}
