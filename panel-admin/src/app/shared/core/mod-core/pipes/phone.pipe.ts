import {Pipe} from "@angular/core";

@Pipe({
  name: "phone"
})
export class PhonePipe {
  transform(phone: string) {
    if (!phone || phone.length != 10) {
      return phone;
    }

    phone = "+57" + phone;
    const countryCodeStr = phone.slice(0, 3);
    const areaCodeStr = phone.slice(3, 6);
    const midSectionStr = phone.slice(6, 9);
    const lastSectionStr = phone.slice(9);

    return `${countryCodeStr} (${areaCodeStr}) ${midSectionStr}-${lastSectionStr}`;
  }
}
