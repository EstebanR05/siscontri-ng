import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUserService } from 'src/app/shared/services/auth-user.service';
import { Contact, ContactFilter } from "src/app/shared/core/mod-core/models/contact.model";
import {AccountVoucherFilter} from '../../core/mod-core/models/account-voucher.model';
import {SERVER_URL} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient,
    private userService: AuthUserService
  ) { }

  deleteContact(contactId: number): Promise<void> {
    const url = `prmt/api/v1/contacts/${contactId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.delete<any>(url, { headers }).toPromise();
  }

  updateContact(contactId: number, contact: Contact): Promise<void> {
    const url = `prmt/api/v1/contacts/${contactId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.put<any>(url, contact, { headers }).toPromise();
  }

  createContact(contact: any): Promise<void> {
    const url = `prmt/api/v1/contacts`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.post<any>(url, contact, { headers }).toPromise();
  }

  getByContactId(contactId: number): Promise<Contact> {
    const url = `prmt/api/v1/search/contacts/${contactId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.get<Contact>(url, { headers }).toPromise();
  }

  getWorkList(filters: ContactFilter, page: number, size: number): Promise<any> {
    const url = `prmt/api/v1/search/contacts/worklist`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    let params = this.bindPaginator(page, size);

    if (filters.name) {
      params = params.append('name', filters.name);
    }

    if (filters.identification) {
      params = params.append('identification', filters.identification);
    }

    if (filters.city) {
      params = params.append('cityId', filters.city.id.toString());
    }

    return this.http.get<any>(url, { headers, params }).toPromise();
  }

  public printAccountingVouchers(filters: ContactFilter, page: number, size: number, bussinessId: number): void {
    const url: string = this.getUrlbyParams(`/prmt/api/v1/search/contacts/printContact?bussinessId=${bussinessId}&page=${page}&size=${size}&offsetOnly=1`, filters);
    window.open(url, '_blank');
  }

  private getUrlbyParams(api: string, filters: ContactFilter): string {
    let url: string = `${SERVER_URL}${api}&`;

    if (filters.name) {
      url += `name=${filters.name.toString()}&`;
    }

    if (filters.identification) {
      url += `identification=${filters.identification.toString()}&`;
    }

    if (filters.city) {
      url += `cityId=${filters.city.id.toString()}&`;
    }

    // Remove the last "&"
    url = url.slice(0, -1);

    return url;
  }

  bindPaginator(page: number = 0, size: number = 3): HttpParams {
    let httpParams = new HttpParams();
    return httpParams
      .set('page', page.toString())
      .set('offsetOnly', "1")
      .set('size', size.toString());
  }
}
