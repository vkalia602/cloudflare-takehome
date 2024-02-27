import { AppDataSource } from "../../data-source";
import Customer from "./customer.entity";
import { Service } from "typedi";
import { hashValue } from "../../common/utils";

@Service()
export class CustomerService {
  private readonly customerRepository = AppDataSource.getRepository(Customer);

  create(customerData: Partial<Customer>) {
    customerData.password = hashValue(customerData.password);
    const newCustomer = this.customerRepository.create(customerData);
    return this.customerRepository.save(newCustomer);
  }

  getCustomerByEmail(email: string): Promise<Customer> {
    return this.customerRepository.findOne({
      where: {
        email: email,
      },
    });
  }
}
