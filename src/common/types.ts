export interface ICustomer {
  id?: string;
  name: string;
  email: string;
  password: string;
  certificates?: ICertificate[];
}

export interface ICertificate {
  certificateId?: string;
  customerId: string;
  active: boolean;
  privateKey: string;
  body: string;
}
