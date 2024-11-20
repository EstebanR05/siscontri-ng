import {IdCodeName} from './id-code-name.model';

export class TransactionFilter {
  document?: IdCodeName;
  branchOffices?: IdCodeName;
  elaborationDateRange?: Date[];
  noDoc?: string;
  periodo?: string;
}
