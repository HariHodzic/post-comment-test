import { Timestamp } from "typeorm";

export class CreateCommentDto{
    content: string;
    dateTime: string =  new Date().toDateString();
}