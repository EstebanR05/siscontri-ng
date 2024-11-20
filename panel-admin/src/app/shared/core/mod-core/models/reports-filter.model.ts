import {IdCodeName} from './id-code-name.model';

export class ReportsFilter {
  document?: IdCodeName;
  accountAccounting?: IdCodeName;
  accountAccountingStart?: IdCodeName;
  accountAccountingEnd?: IdCodeName;
  accounts?: IdCodeName[];
  branchOffices?: IdCodeName;
  costCenters?: IdCodeName;
  contact?: IdCodeName;
  contacts?: IdCodeName[]
  elaborationDateRange?: Date[];
  elaborationDate?: Date;
  businessId?: number;
  format?: IdCodeName;
  invoices?: IdCodeName[];
  users?: IdCodeName[];
  typeInform?: boolean;
  groupsAndSalePrice?: IdCodeName[];
  commissionAgent?: IdCodeName[];
  states?: IdCodeName[];
}
