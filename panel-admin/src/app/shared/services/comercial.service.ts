import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUserService } from 'src/app/shared/services/auth-user.service';
import { AccountVoucher, AccountVoucherFilter } from 'src/app/shared/core/mod-core/models/account-voucher.model';
import { AccountVoucherDetail } from '../core/mod-core/models/account-voucher-detail.model';
import { SERVER_URL } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ComercialService {

  constructor(
    private http: HttpClient,
    private userService: AuthUserService
  ) { }

  public getAccountingComercial(filters: AccountVoucherFilter, page: number, size: number): Promise<any> {
    const url = `acco/api/v1/search/accountingVouchers-comercial`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    let params = this.bindParams(filters, page, size);
    return this.http.get<any>(url, { headers, params }).toPromise();
  }

  public getAccountingComercialById(voucherId: number): Promise<AccountVoucher> {
    const url = `acco/api/v1/search/accountingVouchers/${voucherId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.get<AccountVoucher>(url, { headers }).toPromise();
  }

  public getAccountingComercialDetails(voucherId: number): Promise<AccountVoucherDetail[]> {
    const url = `acco/api/v1/search/accountingVouchers/${voucherId}/details`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.get<AccountVoucherDetail[]>(url, { headers }).toPromise();
  }

  public updateTransationAndDeleteComercial(accountVoucherId: number): Promise<number> {
    const url = `acco/api/v1/accountingComercial/${accountVoucherId}/updateTransationComercial`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put<number>(url, {}, { headers }).toPromise();
  }

  public deleteAccountingClosingYear(accountVoucherId: number): Promise<any> {
    const url = `acco/api/v1/accountingComercial/${accountVoucherId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.delete(url, { headers }).toPromise();
  }

  public authorizeAccountingComercial(accountVoucherId: number): Promise<void> {
    const url = `acco/api/v1/accountingComercial/${accountVoucherId}/authorizeComercial`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put<void>(url, {}, { headers }).toPromise();
  }

  public unautorizedAccountingVoucher(accountVoucherId: number): Promise<any[]> {
    const url = `acco/api/v1/accountingComercial/${accountVoucherId}/unauthorize`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put<any[]>(url, null, { headers }).toPromise();
  }

  // start
  public printAccountingComercial(accountVoucherId: number): void {
    const url = `${SERVER_URL}/acco/api/v1/search/accountingVouchers/${accountVoucherId}/report?Authorization=Bearer ${this.userService.getAccessToken()}`;
    window.open(url, '_blank');
  }

  public updateAccountingComercial(accountVoucher: AccountVoucher, isSave: boolean): Promise<number> {
    const url = `acco/api/v1/accountingVouchers/${accountVoucher.id}/${isSave}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put<number>(url, accountVoucher, { headers }).toPromise();
  }

  public createAccountingComercial(accountVoucher: AccountVoucher): Promise<number> {
    const url = `acco/api/v1/accountingVouchers`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.post<number>(url, accountVoucher, { headers }).toPromise();
  }

  public getConscutiveComercial(documentId: number): Promise<number> {
    const url = `acco/api/v1/search/accountingVouchers/documents/${documentId}/consecutive`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.get<number>(url, { headers }).toPromise();
  }
  // end

  private bindParams(filters, page, size): any {
    let params = this.bindPaginator(page, size);

    if (filters.document) {
      params = params.append('documentId', filters.document.id.toString());
    }

    if (filters.contact) {
      params = params.append('contactsId', filters.contact.id.toString());
    }

    if (filters.branchOffices) {
      params = params.append('businessLocationsId', filters.branchOffices.id.toString());
    }

    if (filters.state) {
      params = params.append('stateId', filters.state.id.toString());
    }

    if (filters.noDoc) {
      params = params.append('noDoc', filters.noDoc);
    }

    if (filters.number) {
      params = params.append('number', filters.number);
    }

    if (filters.elaborationDateRange) {
      const datesRage = filters.elaborationDateRange.map(item => item ? item.getTime() : '');
      params = params.append('startDate', datesRage[0]?.toString());
      params = params.append('endDate', datesRage[1]?.toString());
    }

    return params;
  }

  public printAccountingVouchers(filters: AccountVoucherFilter, page: number, size: number, bussinessId: number): void {
    const url: string = this.getUrlbyParams(`/acco/api/v1/search/printAccountingComercial?bussinessId=${bussinessId}&page=${page}&size=${size}&offsetOnly=1`, filters);
    window.open(url, '_blank');
  }

  private getUrlbyParams(api: string, filters: AccountVoucherFilter): string {
    let url: string = `${SERVER_URL}${api}&`;

    if (filters.document) {
      url += `documentId=${filters.document.id.toString()}&`;
    }

    if (filters.contact) {
      url += `contactsId=${filters.contact.id.toString()}&`;
    }

    if (filters.branchOffices) {
      url += `businessLocationsId=${filters.branchOffices.id.toString()}&`;
    }

    if (filters.state) {
      url += `stateId=${filters.state.id.toString()}&`;
    }

    if (filters.noDoc) {
      url += `noDoc=${filters.noDoc}&`;
    }

    if (filters.number) {
      url += `number=${filters.number}&`;
    }

    if (filters.elaborationDateRange) {
      const datesRage = filters.elaborationDateRange.map(item => item ? item.getTime() : '');

      url += `startDate=${datesRage[0]?.toString()}&`;
      url += `endDate=${datesRage[1]?.toString()}&`;
    }

    // Remove the last "&"
    url = url.slice(0, -1);

    return url;
  }

  private bindPaginator(page: number = 0, size: number = 3): HttpParams {
    let httpParams = new HttpParams();
    return httpParams.set('page', page.toString()).set('offsetOnly', "1").set('size', size.toString());
  }

}

