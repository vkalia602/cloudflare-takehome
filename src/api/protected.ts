let Router = require("@koa/router");
import { Container } from "typedi";
import { CertificateController } from "../modules/certificate/certificate.controller";
import { CustomerController } from "../modules/customer/customer.controller";

const router = new Router();

const customerController = Container.get(CustomerController);
const certificateController = Container.get(CertificateController);

router.post("/customer", async (ctx) => {
  await customerController.createNewCustomer(ctx);
});

router.get("/customer/certificates/active", async (ctx) => {
  await certificateController.getActiveCertificatesForCustomer(ctx);
});

router.post("/certificate/create", async (ctx) => {
  await certificateController.addNewCertificate(ctx);
});

router.put("/certificate/:certificateId/activate", async (ctx) => {
  await certificateController.activateCertificate(ctx);
});

router.put("/certificate/:certificateId/deactivate", async (ctx) => {
  certificateController.deactivateCertificate(ctx);
});

export default router;

// import customerRoutes from './routes/customer'
// import certificateRoutes from './routes/certificate'
// const router = new Router();
// import { Container } from "typedi";
// import { CertificateController } from "../modules/certificate/certificate.controller";
// import { CustomerController } from "../modules/customer/customer.controller";

// router.use("/customer", customerRoutes);
// router.use("/certificate", certificateRoutes);
// console.log(router.routes())
