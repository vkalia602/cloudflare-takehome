import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import Customer from "../customer/customer.entity";

@Entity()
export default class Certificate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne((of) => Customer, (type) => type.certificates, { lazy: true })
  @JoinColumn({ name: "customerId" })
  customer: Customer;

  @Column()
  customerId: string;

  @Column("boolean", { default: true })
  active: boolean = false;

  @Column({ nullable: false })
  privateKey: string;

  @Column()
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
