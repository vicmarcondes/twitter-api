import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Like {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  is_liked: boolean

  @ManyToOne(type => User, user => user.likes)
  user: User
  
  @ManyToOne(type => Post, post => post.likes)
  post: Post
}
