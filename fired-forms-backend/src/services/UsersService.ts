import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';
import { UserLevel } from '../entities/UserLevel.entity';
import { CreateUserDto } from '../dto/CreateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserLevel)
    private readonly userLevelRepository: Repository<UserLevel>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<Omit<User, 'login' | 'password_hash'>> {
    const { fio, login, password, userLevelId } = createUserDto;

    const userLevel = await this.userLevelRepository.findOne({
      where: { id: userLevelId },
    });
    if (!userLevel) {
      throw new NotFoundException(`User level with ID ${userLevelId} not found.`);
    }
  
    const existingUser = await this.userRepository.findOne({
      where: { login },
    });
    if (existingUser) {
      throw new ConflictException(`Login '${login}' already exists.`);
    }
  
    const passwordHash = await bcrypt.hash(password, 10);
  
    const newUser = this.userRepository.create({
      fio,
      login,
      password_hash: passwordHash,
      userLevel,
    });
  
    const savedUser = await this.userRepository.save(newUser);
    
    const { password_hash, ...result } = savedUser; 
    return result;
  }

  async findByLogin(login: string): Promise<User | undefined> {
    return (await this.userRepository.findOne({ where: { login },  relations: ['userLevel'],}));
  }
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['userLevel'], // Загрузить связанные данные уровня пользователя, если нужно
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return user;
  }
}
