import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    //get all users
    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    //get user by id
    @Get(':id')
    async findOneId(@Param('id') id: number): Promise<User> {
        const user = await this.userService.findOneId(id);
        if (!user) {
            throw new NotFoundException('User does not exist!');
        } else {
            return user;
        }
    }

    //get user by id
    @Get(':email')
    async findOneEmail(@Param('email') email: string): Promise<User> {
        const user = await this.userService.findOneEmail(email);
        if (!user) {
            throw new NotFoundException('User does not exist!');
        } else {
            return user;
        }
    }

    //create user
    @Post()
    async create(@Body() user: User): Promise<User> {
        return this.userService.create(user);
    }

    //update user
    @Put(':id')
    async update(@Param('id') id: number, @Body() user: User): Promise<any> {
        return this.userService.update(id, user);
    }

    //delete user
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //handle error if user does not exist
        const user = await this.userService.findOneId(id);
        if (!user) {
            throw new NotFoundException('User does not exist!');
        }
        return this.userService.delete(id);
    }
}
