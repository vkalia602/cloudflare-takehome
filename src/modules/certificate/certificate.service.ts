import { UpdateResult } from "typeorm";
import { AppDataSource } from "../../data-source";
import Certificate from "./certificate.entity";
import { Service } from "typedi";

@Service()
export class CertificateService {
  private readonly certificateRepository =
    AppDataSource.getRepository(Certificate);

  create(certificateData: Partial<Certificate>) {
    const newCert = this.certificateRepository.create(certificateData);
    return this.certificateRepository.save(newCert);
  }

  get(certificateId: string) {
    return this.certificateRepository.find({
      where: {
        id: certificateId,
      },
    });
  }

  getActiveCertificatesByCustomerId(
    customerId: string
  ): Promise<Certificate[]> {
    return this.certificateRepository.find({
      where: {
        customerId: customerId,
        active: true,
      },
    });
  }

  async updateStatus(certificateId: string, active: boolean): Promise<boolean> {
    const updateResult = await this.certificateRepository.update(
      certificateId,
      { active: active }
    );
    if (updateResult.affected == 1) {
      return true;
    }
    return false;
  }
}
