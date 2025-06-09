import { Body, Controller, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { ChangeUserDataUserDto } from './dto/changeUserData-user.dto';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("/login")
    async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
        return this.userService.login(loginUserDto);
    }

    @Post("/register")
    async register(@Body() registerUserDto: RegisterUserDto): Promise<any> {
        return this.userService.register(registerUserDto);
    }

    @Patch("/change-user-data")
    async changeUserData(@Body() changeUserDataUserDto: ChangeUserDataUserDto): Promise<any> {
        return this.userService.changeUserData(changeUserDataUserDto);
    }
}
