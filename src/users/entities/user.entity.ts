import { Like } from 'src/likes/entities/like.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(type => Post, post => post.user)
  posts: Post[]

  @OneToMany(type => Like, like => like.user)
  likes: Like[]
}