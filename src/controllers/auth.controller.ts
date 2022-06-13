import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from 'src/dto/users/auth-credentials.dto';
import { UserRegistrationDto } from 'src/dto/users/user-registration.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/register')
    @UsePipes(new ValidationPipe({ transform: true }))
    signUp(@Body()userRegistrationDto: UserRegistrationDto): Promise<void>{
        return this.authService.createUser(userRegistrationDto);
    }

    @Post('/signIn')
    @UsePipes(new ValidationPipe({ transform: true }))
    signIn (@Body()authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
        return this.authService.signIn(authCredentialsDto);
    }
}
