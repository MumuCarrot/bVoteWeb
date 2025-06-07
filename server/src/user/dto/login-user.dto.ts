import { IsOptional, IsString } from 'class-validator';

export class LoginUserDto {
    @IsOptional()
    @IsString()
    readonly email?: string;

    @IsOptional()
    @IsString()
    readonly username?: string;

    @IsString()
    readonly password: string;
}
