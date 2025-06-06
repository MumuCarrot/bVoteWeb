import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { User } from '../interface/user.interface';

export class CreateUserDto implements User {
    @IsOptional()
    @IsInt()
    readonly id?: number;

    @IsOptional()
    @IsString()
    readonly email?: string;

    @IsOptional()
    @IsString()
    readonly password?: string;

    @IsOptional()
    @IsString()
    readonly username?: string;

    @IsOptional()
    @IsString()
    readonly role?: string;

    @IsOptional()
    @IsString()
    readonly passportData?: string;

    @IsOptional()
    @IsString()
    readonly phoneNumber?: string;

    @IsOptional()
    @IsString()
    readonly publicKey?: string;

    @IsOptional()
    @IsString()
    readonly creationDate?: string;

    @IsOptional()
    @IsArray()
    readonly additionalData?: string[];
}
