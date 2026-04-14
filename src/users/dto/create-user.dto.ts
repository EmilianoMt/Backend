import { IsEmail, IsString, MinLength, MaxLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole, User } from '../entities/user.entity';                                

export class CreateUserDto {
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(50, { message: 'La contraseña es demasiado larga' })
  password: string;

 
  @IsEnum(UserRole, { message: 'El rol debe ser USER o ADMIN' })
  @IsOptional()
  role?: UserRole;
}