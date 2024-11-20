import {IdCodeName} from './id-code-name.model';

export class Document extends IdCodeName {
  description?: string;
  documentType?: IdCodeName;
  accountingDocumentsTypes?: IdCodeName;
  createdDate?: Date;
  startDate?: Date;
  endDate?: Date;

  // Arrays lists OF codes and custome
  codes: string[] = [];
  customes: string[] = [];
}
