import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';

const saltRounds = 9;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    let userExists = await this.findOneByUsername(createUserDto.username);

    if(userExists) {
      return {
        message: "User already exists!",
        error: true
      }
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, saltRounds);

    let response = await this.userRepository.save(createUserDto);

    if(response.id) {
      return {
        message: "Account created successfully!",
        error: false
      }
    } else {
      return {
        message: "Error on create an account",
        error: true
      }
    }
  }

  async login(userPayload: any) {
    let user = await this.findOneByUsername(userPayload.username);

    if(!user) throw new HttpException("Login error 1", HttpStatus.BAD_REQUEST);


    const isMatch = await bcrypt.compare(userPayload.password, user.password);

    console.log('isMatch', isMatch);
    

    if(!isMatch) {
      throw new HttpException("Login error", HttpStatus.BAD_REQUEST);
    } else {
      throw new HttpException("Success", HttpStatus.OK);

    }

  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}