import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './Dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
    private jwtService: JwtService) {}
    async registerUser(registerUserDto: RegisterUserDto) {
      
        const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
        registerUserDto.password = hashedPassword;
        
        const user = await this.userService.createUser(registerUserDto);

        const payload = { email: user.email, sub: user._id };
        const token = this.jwtService.sign(payload);

        return {access_token: token};
    }
}
