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
    console.log("🚀 ~ file: posts.service.ts:21 ~ PostsService ~ create ~ user", user)

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
      
      console.log("🚀 ~ file: posts.service.ts:32 ~ PostsService ~ create ~ post", post)
      
      let response = await this.postRepository.save(post);
      return response;
    }

  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
