import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    //get all
    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    //get user by id
    async findOneId(id: number) {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            return user
        }
        catch (err) {
            throw new NotFoundException("User not found")
        }
    }

    //get user by email
    async findOneEmail(email: string) {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            return user
        }
        catch (err) {
            throw new NotFoundException("User not found")
        }
    }

    //create new user
    async create(user: Partial<User>): Promise<User> {
        const newuser = this.userRepository.create(user);
        return this.userRepository.save(newuser);
    }

    //update user by id
    async update(id: number, user: Partial<User>): Promise<User | null> {
        try {
            await this.userRepository.update(id, user);
            return this.userRepository.findOne({ where: { id } });
        }
        catch (err) {
            throw new NotFoundException("User not found")
        }
    }

    //delete user by id
    async delete(id: number): Promise<void> {
        try {
            await this.userRepository.delete(id);
        }
        catch (err) {
            throw new NotFoundException("User not found")
        }
    }
}