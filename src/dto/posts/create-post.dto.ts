import { IsDate } from 'class-validator';

export class CreatePostDto {
  title: string;

  description: string;

  @IsDate()
  dateTime: Date = new Date();
}
