"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
let UserService = class UserService {
    usersFilePath = 'users.json';
    async readUsers() {
        let fileContent;
        try {
            fileContent = await fs_1.promises.readFile(this.usersFilePath, 'utf8');
        }
        catch (readError) {
            throw new common_1.HttpException({
                success: false,
                message: readError.code === 'ENOENT'
                    ? 'Users file not found'
                    : 'Failed to read users file',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            return JSON.parse(fileContent);
        }
        catch (parseError) {
            throw new common_1.HttpException({
                success: false,
                message: 'Invalid JSON format in users file',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(requestedUser) {
        if ((!requestedUser.email && !requestedUser.username) || !requestedUser.password) {
            throw new common_1.HttpException({
                success: false,
                message: 'Email/Username and password are required',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const users = await this.readUsers();
        let foundUser;
        if (requestedUser.email) {
            foundUser = users.find(u => u.email === requestedUser.email && u.password === requestedUser.password);
        }
        else {
            foundUser = users.find(u => u.username === requestedUser.username && u.password === requestedUser.password);
        }
        if (!foundUser) {
            throw new common_1.HttpException({
                success: false,
                message: 'Invalid credentials',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
        return { success: true, user: foundUser };
    }
    async register(requestedUser) {
        if ((!requestedUser.email && !requestedUser.username) || !requestedUser.password) {
            throw new common_1.HttpException({
                success: false,
                message: 'Email/Username and password are required',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const users = await this.readUsers();
        const maxId = users.reduce((max, user) => Math.max(max, user.id ?? -999), 0);
        const existingUser = users.find(u => {
            return u.email === requestedUser.email || u.username === requestedUser.username;
        });
        if (existingUser) {
            throw new common_1.HttpException({
                success: false,
                message: 'User with that email or username already exists',
            }, common_1.HttpStatus.CONFLICT);
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
            await fs_1.promises.writeFile('users.json', JSON.stringify(users, null, 2), 'utf8');
        }
        catch (writeErr) {
            throw new common_1.HttpException({
                success: false,
                message: 'Failed to save user',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return { success: true, user: newUser };
    }
    async changeUserData(requestedUser) {
        const users = await this.readUsers();
        const userIndex = users.findIndex(u => u.id === requestedUser.id);
        if (userIndex === -1) {
            throw new common_1.HttpException({
                success: false,
                message: 'User not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const existingData = users.find(u => {
            return ((u.email === requestedUser.email || u.username === requestedUser.username) &&
                u.id !== requestedUser.id);
        });
        if (existingData) {
            throw new common_1.HttpException({
                success: false,
                message: 'User with that email or username already exists',
            }, common_1.HttpStatus.CONFLICT);
        }
        users[userIndex] = { ...users[userIndex], ...requestedUser };
        try {
            await fs_1.promises.writeFile('users.json', JSON.stringify(users, null, 2), 'utf8');
        }
        catch (writeErr) {
            throw new common_1.HttpException({
                success: false,
                message: 'Failed to save user data',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return { success: true, user: users[userIndex] };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map