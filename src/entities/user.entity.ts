import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class User{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique:true })
    username: string;

    @Column()
    password: string;
    
    @OneToMany(type => Post, post => post.author,{eager: false})
    posts: Post;
}