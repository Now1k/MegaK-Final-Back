import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RegisterUserResponse } from "../interfaces/user";
import { Repository } from "typeorm";
import { hashPwd } from "../utils/hash-pwd";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  filter(user: User): RegisterUserResponse {
    const { id, name, email } = user;
    return { id, name, email };
  }

  async register(userToRegister: CreateUserDto): Promise<RegisterUserResponse> {
    const newUser = new User();
    newUser.name = userToRegister.name;
    newUser.email = userToRegister.email;
    newUser.password = hashPwd(userToRegister.password);
    await this.usersRepository.save(newUser);
    return this.filter(newUser);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findByToken(loginToken: string | object) {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.currentToken = :loginToken', { loginToken })
      .getOne();
  }

  async loginFind({ email, pwd }) {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .andWhere('user.password = :password', { password: pwd })
      .getOne();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.usersRepository
      .createQueryBuilder()
      .update('user')
      .set(updateUserDto)
      .where('id = :id', { id })
      .execute();
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
    return `User with id:${id} has been removed from database`;
  }
}
