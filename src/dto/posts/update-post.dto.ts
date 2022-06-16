import { IsNotEmpty } from 'class-validator';

export class UpdatePostDto {
  id: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  edited: boolean = true;
}
