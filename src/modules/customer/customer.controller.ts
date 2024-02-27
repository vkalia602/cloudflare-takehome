import { CustomerService } from "./customer.service";
import { Context } from "koa";
import { Service, Inject } from "typedi";
import CustomError from "../../middleware/error.service";

@Service()
export class CustomerController {
  @Inject(() => CustomerService)
  private customerService: CustomerService;
  /**
   * createNewCustomer: Create a new customer
   * @param ctx Koa Context
   * @returns void
   */
  async createNewCustomer(ctx: Context): Promise<void> {
    try {
      const body = ctx.request.body;
      const customer = {
        email: body.email,
        name: body.name,
        password: body.password,
      };
      const resp = await this.customerService.create(customer);
      ctx.body = JSON.stringify(resp);
    } catch (e) {
      if (e.errno === 19) {
        throw new CustomError(409, "Customer already exists");
      }
      throw new CustomError(500, e.message);
    }
  }
}
