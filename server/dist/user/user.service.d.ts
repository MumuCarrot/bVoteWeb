import { User } from './interface/user.interface';
export declare class UserService {
    readonly usersFilePath = "users.json";
    readUsers(): Promise<User[]>;
    login(requestedUser: User): Promise<any>;
    register(requestedUser: User): Promise<any>;
    changeUserData(requestedUser: User): Promise<any>;
}
