import {IdCodeName} from './id-code-name.model';

export class SellPurchase {
  id?: number;
  row?: number;
  document?: IdCodeName;
  accountingAccount?: IdCodeName;
  category?: IdCodeName;
  movement?: IdCodeName;
  createdDate?: Date;
}
