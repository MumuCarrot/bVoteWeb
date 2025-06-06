import { Body, Controller, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("/login")
    async login(@Body() createUserDto: CreateUserDto): Promise<any> {
        return this.userService.login(createUserDto);
    }

    @Post("/register")
    async register(@Body() createUserDto: CreateUserDto): Promise<any> {
        return this.userService.register(createUserDto);
    }

    @Patch("/change-user-data")
    async changeUserData(@Body() createUserDto: CreateUserDto): Promise<any> {
        return this.userService.changeUserData(createUserDto);
    }
}
