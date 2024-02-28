import { JwtService } from '@nestjs/jwt';
import { UserInfor } from './dto/user-infor.dto';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types/tokens.type';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { HttpService } from '@nestjs/axios';
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly httpService;
    constructor(usersService: UsersService, jwtService: JwtService, httpService: HttpService);
    loginOtherServiceProvider(req: any): Promise<any>;
    loginOtherServiceProviderMobile(accessToken: string): Promise<any>;
    loginFacebookMobile(accessToken: string): Promise<any>;
    signupLocal(dto: CreateUserDto): Promise<{
        tokens: Tokens;
        user: UserInfor;
        status: string;
    }>;
    signinLocal(dto: AuthDto): Promise<{
        tokens: Tokens;
        user: UserInfor;
        status: string;
    }>;
    logout(userId: string): Promise<boolean>;
    refreshTokens(userId: string, rt: string): Promise<Tokens>;
    updateRtHash(userId: string, rt: string): Promise<void>;
    getTokens(userId: string, email: string): Promise<Tokens>;
}
