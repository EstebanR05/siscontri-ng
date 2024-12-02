import {IdCodeName} from "./id-code-name.model";

export class AccountAccounting extends IdCodeName {
  subCode?: string;
  accountType?: IdCodeName;
  subAccountingAccountId?: number;
  predefined?: boolean;
  hasChildren?: boolean;
  acceptMovement?: boolean;
  third?: boolean;
  costCenter?: boolean;
  accountPrePayment?: boolean;
  accountPrePaymentProvider?: boolean;
  contrary?: boolean;
  diference?: boolean;
  niif?: boolean;
  withCostCenter?: boolean;
  edit?: boolean;
}

