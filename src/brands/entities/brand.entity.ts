import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,  } from 'typeorm';


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
}