import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';
import { promises as fs } from 'fs';

@Injectable()
export class UserService {
    readonly usersFilePath = 'users.json';

    async readUsers(): Promise<User[]> {
        let fileContent: string;

        try {
            fileContent = await fs.readFile(this.usersFilePath, 'utf8');
        } catch (readError: any) {
            throw new HttpException(
                {
                    success: false,
                    message:
                        readError.code === 'ENOENT'
                            ? 'Users file not found'
                            : 'Failed to read users file',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        try {
            return JSON.parse(fileContent);
        } catch (parseError) {
            throw new HttpException(
                {
                    success: false,
                    message: 'Invalid JSON format in users file',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async login(requestedUser: User): Promise<any> {
        if ((!requestedUser.email && !requestedUser.username) || !requestedUser.password) {
            throw new HttpException(
                {
                    success: false,
                    message: 'Email/Username and password are required',
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        const users: User[] = await this.readUsers();

        let foundUser: User | undefined;
        if (requestedUser.email) {
            foundUser = users.find(u => u.email === requestedUser.email && u.password === requestedUser.password);
        } else {
            foundUser = users.find(u => u.username === requestedUser.username && u.password === requestedUser.password);
        }

        if (!foundUser) {
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

    async register(requestedUser: User): Promise<any> {
        if ((!requestedUser.email && !requestedUser.username) || !requestedUser.password) {
            throw new HttpException(
                {
                    success: false,
                    message: 'Email/Username and password are required',
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        const users: User[] = await this.readUsers();

        const maxId = users.reduce((max, user) =>
            Math.max(max, user.id ?? -999), 0);

        const existingUser = users.find(u=> {
            return u.email === requestedUser.email || u.username === requestedUser.username
        });
        if (existingUser) {
            throw new HttpException(
                {
                    success: false,
                    message: 'User with that email or username already exists',
                },
                HttpStatus.CONFLICT,
            );
        }

        const newUser = {
            id: maxId + 1,
            email: requestedUser.email,
            password: requestedUser.password,
            username: requestedUser.username,
            role: "user",
            passportData: "",
            phoneNumber: "",
            publicKey: "",
            creationDate: new Date().toISOString(),
            additionalData: []
        };

        users.push(newUser);

        try {
            await fs.writeFile('users.json', JSON.stringify(users, null, 2), 'utf8');
        } catch (writeErr) {
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

    async changeUserData(requestedUser: User): Promise<any> {
        const users: User[] = await this.readUsers();

        const userIndex = users.findIndex(u => u.id === requestedUser.id);
        if (userIndex === -1) {
            throw new HttpException(
                {
                    success: false,
                    message: 'User not found',
                },
                HttpStatus.NOT_FOUND,
            );
        }

        const existingData = users.find(u=> {
            return ((u.email === requestedUser.email || u.username === requestedUser.username) &&
                u.id !== requestedUser.id
            );
        });
        if (existingData) {
            throw new HttpException(
                {
                    success: false,
                    message: 'User with that email or username already exists',
                },
                HttpStatus.CONFLICT,
            );
        }

        users[userIndex] = { ...users[userIndex], ...requestedUser };

        try {
            await fs.writeFile('users.json', JSON.stringify(users, null, 2), 'utf8');
        } catch (writeErr) {
            throw new HttpException(
                {
                    success: false,
                    message: 'Failed to save user data',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        return { success: true, user: users[userIndex] };
    }
}
