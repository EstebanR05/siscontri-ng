import {IdCodeName} from "./id-code-name.model";
import {AccountAccounting} from "./account-accounting.model";

export class AccountNode extends IdCodeName {
  data?: AccountAccounting;
  children?: AccountNode[];
  parent?: AccountNode;
  expanded?: boolean;
}
