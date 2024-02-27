import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import Certificate from "../certificate/certificate.entity";
import { Length } from "class-validator";
@Entity()
export default class Customer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => Certificate, (type) => type.customer, { lazy: true })
  certificates: Certificate;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Length(64)
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
