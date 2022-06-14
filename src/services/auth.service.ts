import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegistrationDto } from 'src/dto/users/user-registration.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from 'src/dto/users/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(userRegistrationDto: UserRegistrationDto): Promise<void> {
    const { username, password, repeatPassword } = userRegistrationDto;

    if (password !== repeatPassword) {
      throw new BadRequestException(`Passwords do not match!`);
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      password: passwordHash,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.log(error.message);
      console.log(error.code);
      if (error.code === '23505') {
        //code for duplicate usernames
        throw new ConflictException('Username already exists!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({
      where: { username: username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
