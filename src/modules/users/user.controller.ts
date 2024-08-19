import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDTO } from './user.dto';

@Controller('/user')
@ApiTags('Users')
@ApiHeader({ name: 'X-TENANT-ID' })
export class UserController {
    constructor(
        private readonly service: UserService
    ) {}

    @Post()
    async create(@Body() dto: CreateUserDTO) {
        return await this.service.create(dto);
    }

    @Get()
    async getUsers() {
        return await this.service.getAll();
    }
}
