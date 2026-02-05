import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './Dto/registerUser.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}
    registerUser(registerUserDto: RegisterUserDto) {
      return this.userService.createUser(registerUserDto);
    }
}
