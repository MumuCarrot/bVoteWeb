import { User } from '../interface/user.interface';
export declare class CreateUserDto implements User {
    readonly id?: number;
    readonly email?: string;
    readonly password?: string;
    readonly username?: string;
    readonly role?: string;
    readonly passportData?: string;
    readonly phoneNumber?: string;
    readonly publicKey?: string;
    readonly creationDate?: string;
    readonly additionalData?: string[];
}
