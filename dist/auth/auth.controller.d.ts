import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';
import { UserInfor } from './dto/user-infor.dto';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { MobileGoogleAuthDto } from './dto/mobile-google-auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    googleLogin(req: any, res: any): Promise<any>;
    googleMobileLogin(dto: MobileGoogleAuthDto, res: any): Promise<any>;
    facebookMobileLogin(dto: MobileGoogleAuthDto, res: any): Promise<any>;
    facebookLogin(req: any, res: any): Promise<any>;
    signupLocal(dto: CreateUserDto, res: any): Promise<Tokens>;
    signinLocal(dto: AuthDto, res: any): Promise<UserInfor>;
    logout(userId: string, res: any): Promise<any>;
    refreshTokens(userId: string, refreshToken: string, res: any): Promise<Tokens>;
}
