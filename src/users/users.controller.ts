import { ResetPasswordDto } from './dtos/reset-password.dto';
import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Body,
  Req,
} from '@nestjs/common';
import { of } from 'rxjs';
import { extname, join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UsersService } from './users.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { CheckRandomString } from './dtos/check-random-string.dto';
import { AtGuard } from 'src/common/guards';
import { GetCurrentUserId, Public } from 'src/common/decorators';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post()
  @ApiBody({ type: CreateUserDto })
  // for reusability (admin can update user), I dont use userId through @GetCurrentUserId()
  updateUser(@Body() user: CreateUserDto) {
    return this.userService.updateUser(user);
  }

  @UseGuards(AtGuard)
  @Post('/updatePassword')
  @ApiBody({ type: UpdatePasswordDto })
  updatePassword(
    @Body() passwords: UpdatePasswordDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.userService.updatePassword(passwords, userId);
  }

  @Public()
  @Get('images/:filename')
  getImage(@Param('filename') filename: string, @Res() res) {
    return of(
      res.sendFile(join(process.cwd(), `./uploads/images/avatars/${filename}`)),
    );
  }

  @Public()
  @Post('resetForgottenPassword')
  @ApiBody({ type: ResetPasswordDto })
  resetForgottenPassword(@Body() resetPassword: ResetPasswordDto) {
    return this.userService.resetForgottenPassword(
      resetPassword.email,
      resetPassword.randomString,
      resetPassword.newPassword,
    );
  }

  @Public()
  @Get('sendmail')
  async sendMail(@Req() req) {
    const rawHeaders = req.rawHeaders;
    const clientSide = rawHeaders[rawHeaders.indexOf('Referer') + 1];
    const filter = req.query;
    if (filter === 'undefined') {
      return false;
    }
    return await this.userService.sentMail(filter, clientSide);
  }

  @Public()
  @Post('checkRandomString')
  @ApiBody({ type: CheckRandomString })
  async resetPassword(@Body() checkRandomStringBody: CheckRandomString) {
    if (checkRandomStringBody === null) {
      return false;
    }
    const userFindedByEmail = await this.userService.findOne(
      checkRandomStringBody.email,
    );
    if (userFindedByEmail === null) return false;
    return (
      userFindedByEmail.randomString === checkRandomStringBody.randomString
    );
  }

  @Post('images')
  @UseGuards(AtGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/images/avatars',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  handleUpload(
    @UploadedFile() file: Express.Multer.File,
    @GetCurrentUserId() userId: string,
  ) {
    return this.userService.updateAvatar(file.filename, userId);
  }

  @Get('/similarEmail/:email')
  getSimilarEmail(@Param('email') email: string) {
    return this.userService.getSimilarEmail(email);
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }
}
