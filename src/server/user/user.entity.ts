import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    username: string;

    @Column()
    role: string;

    @Column({ name: 'passport_data' })
    passportData: string;

    @Column({ name: 'phone_number' })
    phoneNumber: string;

    @Column({ name: 'public_key' })
    publicKey: string;

    @Column({ name: 'creation_date' })
    creationDate: string;

    @Column({ name: 'additional_data' })
    additionalData: string;
}
