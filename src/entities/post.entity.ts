import { Exclude } from "class-transformer";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { User } from "./user.entity";

@Entity()
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

    @ManyToOne(type => User, user => user.posts, { eager: true })
    @Exclude({ toClassOnly: true })
    author: User;
}