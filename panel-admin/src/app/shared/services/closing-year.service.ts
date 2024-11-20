import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUserService } from './auth-user.service';
import { ReportsFilter } from '../core/mod-core/models/reports-filter.model';
import { IdCodeName } from '../core/mod-core/models/id-code-name.model';
import { AccountVoucher, AccountVoucherFilter } from '../core/mod-core/models/account-voucher.model';

@Injectable({
  providedIn: 'root'
})
export class ClosingYearService {

  constructor(
    private http: HttpClient,
    private userService: AuthUserService
  ) { }

  public getAccountingClosingYear(filters: AccountVoucherFilter, page: number, size: number): Promise<any> {
    const url = `acco/api/v1/search/accountingClosing`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

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

    return this.http.get<any>(url, { headers, params }).toPromise();
  }

  public getClosingYear(reportsFilter: ReportsFilter): Promise<any> {
    const url = `acco/api/v1/report/closingYear`;
    const params = this.getUrlByFiltersByViewTThidTable(reportsFilter);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.get<any>(url, { headers, params }).toPromise();
  }

  public createClosingYear(accountVoucher: AccountVoucher): Promise<number> {
    const url = `acco/api/v1/closingYear`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.post<number>(url, accountVoucher, { headers }).toPromise();
  }

  public authorizeClosingYear(accountVoucherId: number): Promise<void> {
    const url = `acco/api/v1/closingYear/${accountVoucherId}/authorize`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put<void>(url, {}, { headers }).toPromise();
  }

  public unautorizedAccountingClosing(accountVoucherId: number): Promise<any[]> {
    const url = `acco/api/v1/accountingClosing/${accountVoucherId}/unauthorize`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put<any[]>(url, null, { headers }).toPromise();
  }

  public cancelAccountingClosing(accountVoucherId: number): Promise<void> {
    const url = `acco/api/v1/accountingClosing/${accountVoucherId}/cancel`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put<void>(url, null, { headers }).toPromise();
  }

  public deleteAccountingClosing(accountVoucherId: number): Promise<any> {
    const url = `acco/api/v1/accountingClosing/${accountVoucherId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.delete(url, { headers }).toPromise();
  }

  
  public async getParams(query: string, path: string, q: string): Promise<any> {
    if ((path && path.includes('//'))) {
      return;
    }

    const url = `${path}?q=${query ? query : ''}${q}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    const result = this.http.get(url, { headers, observe: 'response' }).toPromise();
    return (await result).body;
  }

  private getUrlByFiltersByViewTThidTable(reportsFilter: ReportsFilter): any {
    let params = this.bindPaginator(0, 0);

    if (reportsFilter.accountAccountingStart) {
      params = params.append("documentCodeStart", reportsFilter.accountAccountingStart.code.toString());
    }
    if (reportsFilter.accountAccountingEnd) {
      params = params.append('documentCodeEnd', reportsFilter.accountAccountingEnd.code.toString());
    }

    if (reportsFilter.elaborationDate) {
      params = params.append('endDate', reportsFilter.elaborationDate.getTime().toString());
    }

    if (reportsFilter.elaborationDateRange) {
      const datesRage = reportsFilter.elaborationDateRange.map(item => item ? item.getTime() : '');
      //const rage = `${datesRage[0]?.toString()}${datesRage[1]?.toString()}&`;
      params = params.append('startDate', datesRage[0]?.toString());
      params = params.append('endDate', datesRage[1]?.toString());
    }

    if (reportsFilter.contacts) {
      const contactIds = reportsFilter.contacts.map(o => o.id);
      params = params.append('contacts', contactIds.toString());
    }

    if (reportsFilter.accounts) {
      const accounts = reportsFilter.accounts.map(o => o.code);
      params = params.append('accounts', accounts.toString());
    }

    if (reportsFilter.branchOffices) {
      params = params.append('branchOfficesId', reportsFilter.branchOffices.id.toString());
    }

    if (reportsFilter.costCenters) {
      params = params.append('costCenterId', reportsFilter.costCenters.id.toString());
    }

    if (reportsFilter.format) {
      params = params.append('formatId', reportsFilter.format.id.toString());
    }

    params = params.append('businessId', reportsFilter.businessId.toString());

    return params;
  }

  private bindPaginator(page: number = 0, size: number = 3): HttpParams {
    let httpParams = new HttpParams();
    return httpParams.set('page', page.toString()).set('offsetOnly', "1").set('size', size.toString());
  }

}
