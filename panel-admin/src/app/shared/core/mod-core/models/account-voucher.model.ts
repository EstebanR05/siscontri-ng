import { AccountVoucherDetail } from './account-voucher-detail.model';
import { IdCodeName } from './id-code-name.model';

export class AccountVoucher {
  id?: number;
  number?: number;
  invoiceNumber?: string;
  elaborationDate?: Date;
  document?: IdCodeName;
  state?: IdCodeName;
  contact?: IdCodeName;
  branchOffices?: IdCodeName;
  user?: IdCodeName;
  total?: number;
  observation?: string;
  accountingVoucherDetails?: AccountVoucherDetail[];
}

export class AccountVoucherFilter {
  document?: IdCodeName;
  state?: IdCodeName;
  contact?: IdCodeName;
  branchOffices?: IdCodeName;
  elaborationDateRange?: Date[];
  noDoc?: string;
  number?: string;
}
