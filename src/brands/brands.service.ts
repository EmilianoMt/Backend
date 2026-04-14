import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    
  ) {}
  create(createBrandDto: CreateBrandDto) {
    try {
      const newBrand = this.brandRepository.create(createBrandDto);
      return this.brandRepository.save(newBrand);
    } catch (error) {
      throw new NotFoundException('Error al crear la marca');
    }
  }

  async findAll() {
    const brands = await this.brandRepository.find();
    if (brands.length === 0) {
      throw new NotFoundException('No se encontraron marcas');
    }
    return brands;
  }

  async findOne(name: string) {
    const brand = await this.brandRepository.findOne({ where: { name } });
    if (!brand) {
      throw new NotFoundException(`Marca con nombre ${name} no encontrada`);
    }
    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandRepository.preload({
      id: id,
      ...updateBrandDto,
    });

    if (!brand) throw new NotFoundException(`Marca con ID ${id} no encontrada`);

    return this.brandRepository.save(brand);
  }

  async remove(id: number) {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`Marca con ID ${id} no encontrada`);
    }
    return this.brandRepository.remove(brand);
  }
}
