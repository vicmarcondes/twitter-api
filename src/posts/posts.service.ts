import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private userService: UsersService
  ) {}

  async create(createPostDto: CreatePostDto) {
    let user: User = await this.userService.findOneByUsername(createPostDto.username);

    if(!user) {
      return {
        message: "User doesn't exists!",
        error: false
      }
    } else {
      let post = {
        text: createPostDto.text,
        user
      }
          
      let response = await this.postRepository.save(post);
      return response;
    }

  }

  async findAll() {
     let posts: any = await this.postRepository.find({relations: ["user"]});
     posts.forEach(post => delete post.user.password);
     return posts;   
  }

  async findOneById(id: string): Promise<Post | undefined> {
    return this.postRepository.findOne({where: {id}});
  }
}
