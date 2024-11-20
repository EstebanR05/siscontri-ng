import {IdCodeName} from './id-code-name.model';

export class DetailsExogenous {
  id?: number;
  row?: number;
  account?: IdCodeName;
  format?: IdCodeName;
  concept?: IdCodeName;
  typePay?: IdCodeName;
  accountingMovement?: IdCodeName;
  createdDate?: Date;
}
