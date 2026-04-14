import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany,  } from 'typeorm';


@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  countryOrigin: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  
  @OneToMany(() => Vehicle, (vehicle) => vehicle.brand)
  vehicles: Vehicle[];
}