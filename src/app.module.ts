import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BrandsModule } from './brands/brands.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, 
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false, 
        },
      },
    }),
    UsersModule,
    BrandsModule,
    VehiclesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
