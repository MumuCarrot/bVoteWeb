import { IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
    @IsOptional()
    @IsString()
    readonly email?: string;

    @IsOptional()
    @IsString()
    readonly username?: string;

    @IsString()
    readonly password: string;
}
