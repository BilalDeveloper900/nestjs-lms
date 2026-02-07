import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from 'src/auth/Dto/registerUser.dto';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async createUser(registerUserDto: RegisterUserDto) {
        try {
            const existingUser = await this.userModel
                .findOne({ email: registerUserDto.email })
                .lean();
            if (existingUser) {
                throw new ConflictException('Email already exists');
            }
            const createdUser = new this.userModel({ ...registerUserDto, role: 'user' });
            return createdUser.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Email already exists');
            }
            throw error;
        }
    }
}
