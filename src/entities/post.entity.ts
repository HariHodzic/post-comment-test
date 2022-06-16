import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@Entity({ orderBy: { dateTime: 'DESC' } })
export class Post {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('boolean', { default: false })
  edited: boolean;

  @Column()
  dateTime: Date;

  @ManyToOne((type) => User, (user) => user.posts, { eager: true })
  author: User;

  @OneToMany((type) => Comment, (comments) => comments.post, { eager: true })
  comments: Comment[];
}
