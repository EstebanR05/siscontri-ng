import { AccountClassification } from "./account-classification.model";
import { IdCodeName } from "./id-code-name.model";

export class Classification {
  id?: number;
  accounts?: AccountClassification[];
  name?: string;
  order?: number;
  classificationOrigin?: Classification;
  classifications?: Classification[];
  selected?: boolean;
  isEdit?: boolean;
  operation?: number;
  accoAccountingMovements?: IdCodeName;
}
