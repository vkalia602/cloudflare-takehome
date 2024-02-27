import "reflect-metadata";
import { DataSource } from "typeorm";
import Certificate from "./modules/certificate/certificate.entity";
import Customer from "./modules/customer/customer.entity";
import "dotenv/config";
import { CertificateSubscriber } from "./modules/certificate/certificate.subscriber";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DATABASE,
  synchronize: true,
  dropSchema: false,
  logging: false,
  entities: [Customer, Certificate],
  migrations: [],
  subscribers: [CertificateSubscriber],
});
