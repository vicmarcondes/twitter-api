import { forwardRef, Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { Like } from './entities/like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [forwardRef(() => PostsModule), UsersModule, TypeOrmModule.forFeature([Like, User, Post])],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesService]
})
export class LikesModule {}
