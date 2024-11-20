import {IdCodeName} from './id-code-name.model';

export class Transaction {
  id?: number;
  row?: number;
  business?: IdCodeName;
  businessLocations?: IdCodeName;
  contact?: IdCodeName;
  transactionDate?: Date;
  total?: number;
  type?: string;
  status?: string;
  paymentStatus?: string;
  invoiceNo?: string;
  refNo?: string;
  discountType?: string;
  createdAt?: Date;
}
