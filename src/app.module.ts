import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { config } from './ormconfig';
import { PostsModule } from './posts/posts.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, PostsModule, LikesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}