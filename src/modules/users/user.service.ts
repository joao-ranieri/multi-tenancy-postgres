import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDTO } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_MODEL') private readonly repository: Repository<User>
    ) {};

    async create(dto: CreateUserDTO) {
        const user = new User(dto.name, dto.email, dto.password);
        return await this.repository.save(user);
    }

    async getAll() {
        return this.repository.find();
    }
}
