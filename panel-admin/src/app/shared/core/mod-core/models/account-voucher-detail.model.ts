import {IdCodeName} from './id-code-name.model';
import { AccountAccounting } from './account-accounting.model';

export class AccountVoucherDetail {
  paymentMethod?: boolean = false;
  id?: number;
  row?: number;
  isAdded?: boolean;
  accountingAccount?: AccountAccounting;
  contact?: IdCodeName;
  description?: string;
  invoiceNumber?: string;
  debit?: number;
  credit?: number;
  costCenter?: IdCodeName;
  withTransaction?: boolean;
  creditDisabled?: boolean;
  transactionPortfolioId?: number;
}

