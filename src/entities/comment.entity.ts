import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  content: string;

  @Column()
  dateTime: Date;

  @Column({ type: 'string', nullable: true })
  postId: string;

  @ManyToOne(() => Post, (post) => post.comments, { eager: false })
  @JoinColumn({ name: 'postId' })
  @Exclude({ toClassOnly: true })
  post: Post;

  @Column({ type: 'string', nullable: true })
  authorId: string;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  @JoinColumn({ name: 'authorId' })
  // @Exclude({ toClassOnly: true })
  author: User;
}
