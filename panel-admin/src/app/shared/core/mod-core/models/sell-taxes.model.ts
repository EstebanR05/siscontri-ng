import {IdCodeName} from './id-code-name.model';

export class SellTaxes {
  id?: number;
  row?: number;
  document?: IdCodeName;
  accountingAccountTaxes?: IdCodeName;
  taxesRates?: IdCodeName;
  movementTaxes?: IdCodeName;
  createdDate?: Date;
}

