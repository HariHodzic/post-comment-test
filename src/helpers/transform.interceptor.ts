import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
} from '@nestjs/common';
import { instanceToInstance, instanceToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';
import { AuthorDto } from 'src/dto/users/author.dto';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next
      .handle()
      .pipe(map((data) => instanceToInstance<AuthorDto>(data)));
  }
}
