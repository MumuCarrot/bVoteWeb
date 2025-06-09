import { IsInt, IsOptional, IsString } from 'class-validator';

export class ChangeUserDataUserDto {
    @IsInt()
    id: number;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    additionalData?: string;
}
