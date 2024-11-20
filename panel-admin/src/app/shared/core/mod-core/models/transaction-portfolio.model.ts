import { IdCodeName } from "./id-code-name.model";

export class TransactionPortfolio {
  id?: number;
  credit?: boolean;
  account?: IdCodeName;
  consecutivo?: string;
  centroDeCostos?: string;
  contact?: IdCodeName;
  invoicedNumber?: string;
  finalTotal?: number;
  payment?: number;
  balance?: number;
  crossValue?: number;
  selected?: boolean;
}

export class TransactionPortfolioFilter {
  contacts?: IdCodeName[];
  branchOffices?: IdCodeName;
  branchOfficesId?: number;
  invoicedNumber?: string;
  accountsPayable?: boolean;
  accountsReceivable?: boolean;
  accountAccountingStart?: IdCodeName;
  accountAccountingEnd?: IdCodeName;
  elaborationDate?: Date;
  businessId?: number;
}
