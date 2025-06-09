import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { ChangeUserDataUserDto } from './dto/changeUserData-user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async login(loginUserDto: LoginUserDto): Promise<any> {
        if ((!loginUserDto.email && !loginUserDto.username) || !loginUserDto.password) {
            console.error("Login error: Email/Username and password are required");
            throw new HttpException(
                {
                    success: false,
                    message: 'Email/Username and password are required',
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        let foundUser: User | null;
        if (loginUserDto.email) {
            foundUser = await this.userRepository.findOne({ where: { email: loginUserDto.email, password: loginUserDto.password } });
        } else {
            foundUser = await this.userRepository.findOne({ where: { username: loginUserDto.username, password: loginUserDto.password } });
        }

        if (!foundUser) {
            console.error("Login error: Invalid credentials");
            throw new HttpException(
                {
                    success: false,
                    message: 'Invalid credentials',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }
        return { success: true, user: foundUser };
    }

    async register(registerUserDto: RegisterUserDto): Promise<any> {
        if ((!registerUserDto.email && !registerUserDto.username) || !registerUserDto.password) {
            console.error('Email/Username and password are required');
            throw new HttpException(
                {
                    success: false,
                    message: 'Email/Username and password are required',
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        const existingUser = await this.userRepository.findOne({ where: { email: registerUserDto.email, password: registerUserDto.password } });
        if (existingUser) {
            console.error('User with that email or username already exists');
            throw new HttpException(
                {
                    success: false,
                    message: 'User with that email or username already exists',
                },
                HttpStatus.CONFLICT,
            );
        }

        let newUser: User = {
            email: registerUserDto.email ?? "",
            password: registerUserDto.password,
            username: registerUserDto.username ?? "",
            role: "user",
            passportData: "",
            phoneNumber: "",
            publicKey: "",
            creationDate: new Date().toISOString(),
            additionalData: ""
        }

        try {
            await this.userRepository.save(newUser);
        } catch (writeErr) {
            console.error('Failed to save user');
            throw new HttpException(
                {
                    success: false,
                    message: 'Failed to save user',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }

        return { success: true, user: newUser };
    }

    async changeUserData(changeUserDataUserDto: ChangeUserDataUserDto): Promise<any> {
        const result = await this.userRepository.update(
            changeUserDataUserDto.id,
            changeUserDataUserDto,
        );

        if (result.affected === 0) {
            throw new NotFoundException(`User with id ${changeUserDataUserDto.id} not found`);
        }

        return { success: true, message: 'User data updated successfully' };
    }
}
