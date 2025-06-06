export interface User {
    id?: number;
    email?: string;
    password?: string;
    username?: string;
    role?: string;
    passportData?: string;
    phoneNumber?: string;
    publicKey?: string;
    creationDate?: string;
    additionalData?: string[];
}
