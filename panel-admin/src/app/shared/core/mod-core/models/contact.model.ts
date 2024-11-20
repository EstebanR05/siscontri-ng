import { IdCodeName } from "./id-code-name.model";

export class Contact {
  id?: number;
  name?: string;
  type?: string | IdCodeName;
  businessName?: string;
  firstName?: string;
  secondName?: string;
  lastName?: string;
  secondLastName?: string;
  organizationType?: IdCodeName;
  identificationType?: IdCodeName;
  identification?: string;
  dv?: number | string;
  address?: string;
  cellphone?: string;
  email?: string;
  city?: string | IdCodeName;
  state?: IdCodeName;
  createdAt?: Date;
}

export class ContactFilter {
  name?: string;
  identification?: string;
  city?: IdCodeName;
}

