import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Like } from 'src/likes/entities/like.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Post, User, Like])],
  controllers: [PostsController],
  providers: [PostsService, UsersService]
})
export class PostsModule {}
