import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  content: string;

  @IsDate()
  dateTime: Date = new Date();

  postId: string;
}
