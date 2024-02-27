import { CustomerService } from "../customer/customer.service";
import { Context } from "koa";
import { CertificateService } from "./certificate.service";
import { Service, Inject } from "typedi";
import { isPasswordMatch } from "../../common/utils";
import type Certificate from "./certificate.entity";
import CustomError from "../../middleware/error.service";

@Service()
export class CertificateController {
  @Inject(() => CustomerService)
  private customerService: CustomerService;
  @Inject(() => CertificateService)
  private certificateService: CertificateService;

  /**
   * addNewCertificate: Add a new certificate
   * @param ctx Koa Context
   * @returns void
   */
  async addNewCertificate(ctx: Context): Promise<void> {
    const { email, password } = ctx.headers;
    const customerId = await this.getCustomerIdByEmailPassword(
      email as string,
      password as string
    );
    if (customerId) {
      let certificate: Partial<Certificate> = {
        customerId,
        active: false,
        privateKey: "string;",
        body: "string",
      };
      certificate = await this.certificateService.create(certificate);
      ctx.body = JSON.stringify(certificate);
    }
  }
  /**
   * getActiveCertificatesForCustomer: Get active certificates for a customer
   * @param ctx Koa Context
   * @returns void
   */
  async getActiveCertificatesForCustomer(ctx: Context): Promise<void> {
    const { email, password } = ctx.headers;
    const customerId = await this.getCustomerIdByEmailPassword(
      email as string,
      password as string
    );
    if (customerId) {
      const certs =
        await this.certificateService.getActiveCertificatesByCustomerId(
          customerId
        );
      ctx.body = JSON.stringify(certs);
    }
  }
  /**
   * activateCertificate: Activate a certificate using customer id
   * @param ctx Koa Context
   * @returns void
   */
  async activateCertificate(ctx: Context): Promise<void> {
    try {
      const { certificateId } = ctx.params;
      const update = await this.certificateService.updateStatus(
        certificateId,
        true
      );
      ctx.body = JSON.stringify({ success: update });
    } catch (e) {
      throw new CustomError(404, e.message);
    }
  }

  async deactivateCertificate(ctx: Context) {
    const { certificateId } = ctx.params;
    const update = await this.certificateService.updateStatus(
      certificateId,
      false
    );
    ctx.body = JSON.stringify({ success: update });
  }
  /*
   * getCustomerIdByEmailPassword: Get customer id by email and password
   * @param email
   * @param password
   */
  async getCustomerIdByEmailPassword(
    email: string,
    password: string
  ): Promise<string> {
    const customer = await this.customerService.getCustomerByEmail(email);
    if (customer) {
      if (await isPasswordMatch(password, customer.password)) {
        return customer.id;
      } else {
        throw new CustomError(401, "Incorrect password");
      }
    } else {
      throw new CustomError(401, "Customer does not exist");
    }
  }
}
