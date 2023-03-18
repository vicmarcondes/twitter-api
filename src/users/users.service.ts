import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';
import { PostsService } from "src/posts/posts.service";
let jwt = require('jsonwebtoken');

const saltRounds = 9;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => PostsService))
    private postService: PostsService,
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
    createUserDto.createdAt = new Date();
    
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

    if(!user) {
      return {
        message: "Username or password doesn't exists.",
        error: true
      }
    } 
    
    const isMatch = await bcrypt.compare(userPayload.password, user.password);    

    if(!isMatch) {
      return {
        message: "Username or password doesn't exists.",
        error: true
      }
    } else {
      const payload = { username: user.username, id: user.id, fullname: user.fullname };
      
      return {
        error: false,
        access_token: jwt.sign(payload, process.env.SECRET, {expiresIn: '1h'})
      };
    }

  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({where: {id}});
  }

  async getUserData(username: string) {
    let response: any = await this.userRepository.findOne({where: {username}, relations: ['likes']});
    
    if(response) {
      delete response.password;
      let postsFromUser: any = await this.postService.findAllFromUser(response.id);
      response.posts = postsFromUser.posts;

      return {
        user: response,
        error: false
      }
    } else {
      return {
        error: true,
        message: "User doesn't exist."
      }
    }
  

  
  }
}