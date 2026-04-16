import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Roles } from '../users/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { JwtAuthGuard } from 'src/users/guard/jwt-auth.guard';
import { RolesGuard } from 'src/users/guard/roles.guard';
import { AwsService } from 'src/aws/aws.service';
import { FileInterceptor } from '@nestjs/platform-express';



@Controller('vehicles')
export class VehiclesController {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly awsService: AwsService,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('imageUrl'))
  async create(
    @Body() createVehicleDto: CreateVehicleDto,
    @UploadedFile() file: any,
  ) {
    if (!file){
      return this.vehiclesService.create(createVehicleDto);
    } else {
      const photo = await this.awsService.uploadFile(file);
      createVehicleDto.imageUrl = photo;
      return this.vehiclesService.create(createVehicleDto);
    }
  }

  @Post('upload/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const response = await this.awsService.uploadFile(file);
    return this.vehiclesService.update(id, {
      imageUrl: response,
    });
  }

  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get('model/:model')
  findOne(@Param('model') model: string) {
    return this.vehiclesService.findOne(model);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('imageUrl'))
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      const photo = await this.awsService.uploadFile(file);
      updateVehicleDto.imageUrl = photo;
    }

    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }
}
