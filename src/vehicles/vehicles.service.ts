import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto'; 
import { Brand } from '../brands/entities/brand.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto) {
    const { brandId, ...vehicleData } = createVehicleDto;

    const brand = await this.brandRepository.findOneBy({ id: brandId });
    if (!brand) throw new NotFoundException(`La marca con ID ${brandId} no existe`);

    const vehicle = this.vehicleRepository.create({
      ...vehicleData,
      brand,
    });

    return await this.vehicleRepository.save(vehicle);
  }

  async findAll() {
    return await this.vehicleRepository.find();
  }

  async findOne(model: string) {
    const vehicle = await this.vehicleRepository.findOne({ where: { model } });
    if (!vehicle) throw new NotFoundException(`Vehículo con modelo ${model} no encontrado`);
    return vehicle;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    const { brandId, ...vehicleData } = updateVehicleDto;

    const vehicle = await this.vehicleRepository.preload({
      id,
      ...vehicleData,
    });

    if (!vehicle) throw new NotFoundException(`Vehículo con ID ${id} no encontrado`);

    if (brandId) {
      const brand = await this.brandRepository.findOneBy({ id: brandId });
      if (!brand) throw new NotFoundException(`La marca con ID ${brandId} no existe`);
      vehicle.brand = brand;
    }

    return await this.vehicleRepository.save(vehicle);
  }

  async remove(id: string) {
    const vehicle = await this.vehicleRepository.findOneBy({ id });
    if (!vehicle) throw new NotFoundException(`Vehículo con ID ${id} no encontrado`);
    
    await this.vehicleRepository.remove(vehicle);
    return { message: 'Vehículo eliminado con éxito' };
  }
}