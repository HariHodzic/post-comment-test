import { IsDate } from "class-validator";
import { Timestamp } from "typeorm";

export class CreateCommentDto{

    content: string;

    @IsDate()
    dateTime: Date = new Date;
}