import {IdCodeName} from './id-code-name.model';

export class PaymentsMovements {
  id?: number;
  row?: number;
  document?: IdCodeName;
  accountingAccount?: IdCodeName;
  transactionMethods?: IdCodeName;
  accountingMovements?: IdCodeName;
  createdDate?: Date;
}

export class Retefunte{
  id?: number;
  row?: number;
  document?: IdCodeName;
  typeWithholding?: IdCodeName;
  transactionMethods?: IdCodeName;
  accountingMovements?: IdCodeName;
  createdDate?: Date;
}

