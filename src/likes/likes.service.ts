import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { PostsService } from 'src/posts/posts.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {

  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    private userService: UsersService,
    private postService: PostsService
  ) {}
  async create(createLikeDto: CreateLikeDto) {
    const {post_id, user_id} = createLikeDto;
    // let isLiked = await this.isLiked(user_id, post_id);
    const user: User =  await this.userService.findOneById(user_id);
    const post: Post =  await this.postService.findOneById(post_id);
    
    let like = {
      is_liked: createLikeDto.like,
      user,
      post
    }
    
    return await this.likeRepository.save(like);
  }

  async isLiked(user_id, post_id) {
    const user: User =  await this.userService.findOneById(user_id);
    const post: Post =  await this.postService.findOneById(post_id);


    return await this.likeRepository.findOne({where: {user, post}});   

  }
}
