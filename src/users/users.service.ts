import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserDocument } from './schemas/users.schema';
import hashPassword from 'src/utils/hashPassword';
import randomstringGenerator = require('randomstring');
import sendGrid = require('@sendgrid/mail');
import { emailContent } from './template/email.content';

// export type User={
//      id: number;
//      name:string;
//      username:string;
//      password:string;
// }

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) { }

  async findOne(email: string): Promise<UserDocument | undefined> {
    return await this.userModel.findOne({ email });
  }

  async getUser(id: string) {
    const user = await await this.userModel
      .findOne({ _id: id })
      // projector, remove password and isLock field
      .select('-password -isLock');
    if (user) {
      return { data: user, success: true };
    }
  }

  async createUser(user: CreateUserDto): Promise<any> {
    user.avatar = user.avatar || 'avatar.jpeg';
    const newUser = new this.userModel(user);
    await newUser.save();
    return newUser;
  }
  async findEmail(email: any): Promise<any> {
    return await this.userModel.findOne({ email: email });
  }
  async resetRefreshToken(id: string): Promise<any> {
    return await this.userModel.findByIdAndUpdate(id, { refreshToken: null });
  }
  async updateRefreshToken(id: string, refreshToken: string): Promise<any> {
    return await this.userModel.findByIdAndUpdate(id, { refreshToken });
  }
  async getUserById(id: string): Promise<any> {
    return await this.userModel.findById(id);
  }
  async getUserByEmail(email: string): Promise<any> {
    return await this.userModel.findOne({
      email
    });
  }
  async updateAvatar(newAvatar, userId) {
    const user = await this.userModel.findOne({ _id: userId });
    const oldAvt = user.avatar;
    user.avatar = newAvatar;
    user.save();
    //remove prev avt
    if (oldAvt !== 'avatar.jpeg')
      try {
        fs.unlinkSync(`./uploads/images/avatars/${oldAvt}`);
      } catch (err) {
        console.error(err);
      }
  }

  async updateUser(user: UpdateUserDto) {
    const userId = user._id;
    delete user._id;
    // if user not provide DOB, remove it
    const userChanged: any = { $set: user };
    if (!user.DOB) userChanged.$unset = { DOB: 1 };
    // note: if user contain _id, this will throw err
    try {
      await this.userModel.findOneAndUpdate({ _id: userId }, userChanged);
    } catch (error) {
      console.log('update user service error', error);
    }
    const updatedUser = await this.userModel.findOne({ _id: userId });
    return updatedUser;
  }

  async updatePassword(passwords: UpdatePasswordDto, userId: string) {
    const user = await this.userModel.findOne({ _id: userId });
    const matched = await bcrypt.compare(passwords.oldPassword, user.password);
    if (matched) {
      user.password = await hashPassword(passwords.newPassword);
      user.save();
      return { success: true };
    } else return { success: false };
  }
  async getSimilarEmail(email: string) {
    return await this.userModel.find({ email: { $regex: email } });
  }
  async updateRandomString(user: UpdateUserDto, randomString: string) {
    try {
      return await this.userModel.findByIdAndUpdate(user._id, {
        randomString: randomString,
      });
    } catch (error) {
      console.log('update user service error', error);
    }
  }

  async sentMail(filter: any, clientSide: any) {
    const email = filter.email;
    const userFindedByEmail = await this.findOne(email);
    const resetPasswordCode = randomstringGenerator.generate();
    if (userFindedByEmail === null) {
      return false;
    }
    await this.updateRandomString(userFindedByEmail, resetPasswordCode);
    sendGrid.setApiKey(process.env.API_SEND_MAIL_KEY);
    const message = {
      to: email,
      from: 'eworkbook.official@gmail.com',
      subject: 'The reset password link for eworkbook',
      text: 'This is text property',
      html: emailContent(
        userFindedByEmail,
        filter,
        clientSide,
        resetPasswordCode,
      ),
    };
    sendGrid
      .send(message)
      .then(() => {
        console.log('Email sent...');
      })
      .catch((error) => {
        console.log('Get error...', error.message);
      });
    return true;
  }

  async resetForgottenPassword(
    email: string,
    randomString: string,
    newPassword: string,
  ) {
    if (email === null) return false;
    try {
      const userFindedByEmailAndRandomString = await this.userModel.findOne({
        email: email,
        randomString: randomString,
      });
      if (userFindedByEmailAndRandomString === null) {
        return false;
      }
      userFindedByEmailAndRandomString.password = await hashPassword(
        newPassword,
      );
      userFindedByEmailAndRandomString.randomString =
        randomstringGenerator.generate();
      userFindedByEmailAndRandomString.save();
      return true;
    } catch (error) {
      console.log('reset forgotten password fail with error: ', error);
    }
  }
}
