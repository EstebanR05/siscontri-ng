import { IdCodeName } from "./id-code-name.model";

export class payrollSetup{
    id?: number;
    row?: number;
    document?: IdCodeName;
    payrollConcept?: string;
    payrollConceptCodeName?: IdCodeName;
    accountingAccountCredit?: IdCodeName;
    accountingAccountDebit?: IdCodeName;
    createdDate?: Date;
  }