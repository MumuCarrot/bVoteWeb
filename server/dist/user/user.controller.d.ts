import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    login(createUserDto: CreateUserDto): Promise<any>;
    register(createUserDto: CreateUserDto): Promise<any>;
    changeUserData(createUserDto: CreateUserDto): Promise<any>;
}
