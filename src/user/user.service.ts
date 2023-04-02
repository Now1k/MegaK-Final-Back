import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.save(createUserDto);
    return newUser;
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set(updateUserDto)
      .where("id = :id", { id })
      .execute();
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
    return "User id:`e7b51ab0-3e7c-426c-8052-efb8bd10ba88` has been removed from database";
  }
}
