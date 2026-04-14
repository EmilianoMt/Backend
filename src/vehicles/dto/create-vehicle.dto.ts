import { IsString, IsNumber, Min, Max, IsUUID, IsBoolean, IsOptional } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  model: string;

  @IsNumber()
  @Min(1900)
  @Max(2027)
  year: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsNumber()
  brandId: number;
}