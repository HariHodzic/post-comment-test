import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment{

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    content: string;

    @Column()
    dateTime: Date;
}