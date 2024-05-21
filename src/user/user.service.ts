import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserInput } from './graphql/create-user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) { }

    createUser(input: CreateUserInput) {
        return this.userRepo.save(input);
    }

    findOne(data: FindOneOptions<User>) {
        return this.userRepo.findOne(data);
    }
}
