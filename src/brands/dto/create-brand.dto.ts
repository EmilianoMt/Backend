import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @MinLength(2, { message: 'El nombre de la marca es demasiado corto' })
  name: string;

  @IsString()
  @IsOptional()
  countryOrigin?: string;
}