import { IdCodeName } from "./id-code-name.model";

export class PrePaymentFilter {
    contacts?: IdCodeName[];
    branchOfficesId?: number;
    invoicedNumber?: string;
    accountsPrePayment?: boolean;
    accountsPrePaymentProv?: boolean;
  }