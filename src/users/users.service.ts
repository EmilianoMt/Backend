import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = this.userRepository.create({
        ...userData,
        password: hashedPassword,
      });

      const userSaved = await this.userRepository.save(newUser);
      
      return userSaved;

    } catch (error: any) {
      if (error.code === '23505') {
        throw new BadRequestException('El correo electrónico ya está registrado');
      }
      throw new BadRequestException('Error al crear el usuario');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role'], 
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales no válidas (Email)');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales no válidas (Password)');
    }

    const payload = { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    };

    const { password: _, ...userResult } = user;

    return {
      user: userResult,
      token: this.jwtService.sign(payload),
    };
  }
}