import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './users/dtos/create-user.dto';
import { GetCurrentUserId } from './common/decorators/get-current-user-id.decorator';
import { AtGuard } from './common/guards';

@Controller()
@ApiTags('Auth')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) { }

  // for antd pro
  @UseGuards(AtGuard)
  @Get('currentUser')
  getCurrentUser(@GetCurrentUserId() userId: string) {
    return this.userService.getUser(userId);
  }

  @Get('hello')
  getHello(): string {
    return 'Hello World!';
  }

  @Post('register')
  // async register(
  //      @Body() body
  // ){
  //      let {email,password,role}=body;
  //      password=await bcrypt.hash(password,12)
  //      let newUser={email,password,role};

  //      return this.userService.createUser(newUser);
  // }
  async register(@Body() body, @Res() res: Response) {
    const { email, role, firstName, lastName } = body;
    let { password } = body;
    password = await bcrypt.hash(password, 12);
    const newUser: CreateUserDto = {
      email,
      password,
      role,
      firstName,
      lastName,
    };
    //check exist email
    if ((await this.userService.findEmail(newUser.email)) != null) {
      return res.send({
        status: 'error',
        message: 'Email exists',
      });
    } else {
      const ret = await this.userService.createUser(newUser);
      return res.status(HttpStatus.CREATED).send({
        ...ret,
        status: 'success',
        message: 'Register successfully',
      });
    }
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('logout')
  // logout(@Response() res: Response): any{
  //      response.clearCookie('jwt');
  //      return{
  //           message:"success"
  //      }
  // }
}
