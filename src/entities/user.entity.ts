import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment.entity';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany((type) => Post, (post) => post.author, { eager: false })
  posts: Post;

  @OneToMany((type) => Comment, (comments) => comments.author, { eager: false })
  comments: Comment;
}
