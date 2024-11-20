import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/environments/environment';
import { AuthUserService } from 'src/app/shared/services/auth-user.service';
import { AccountVoucherDetail } from 'src/app/shared/core/mod-core/models/account-voucher-detail.model';
import { AccountVoucher, AccountVoucherFilter } from 'src/app/shared/core/mod-core/models/account-voucher.model';
import { ReportsFilter } from 'src/app/shared/core/mod-core/models/reports-filter.model';
import { TransactionFilter } from 'src/app/shared/core/mod-core/models/transaction-filter.model';
import { Transaction } from 'src/app/shared/core/mod-core/models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TreasuryService {

  constructor(
    private http: HttpClient,
    private userService: AuthUserService
  ) { }

  //start
  public getConscutiveTreasury(documentId: number): Promise<number> {
    const url = `acco/api/v1/search/accountingVouchers/documents/${documentId}/consecutive`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.get<number>(url, { headers }).toPromise();
  }

  public getAccountingTreasury(filters: AccountVoucherFilter, page: number, size: number): Promise<any> {
    const url = `acco/api/v1/search/accountingTreasury`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    let params = this.bindParams(filters, page, size);
    return this.http.get<any>(url, { headers, params }).toPromise();
  }

  public getAccountingTreasuryById(voucherId: number): Promise<AccountVoucher> {
    const url = `acco/api/v1/search/accountingVouchers/${voucherId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.get<AccountVoucher>(url, { headers }).toPromise();
  }

  public getAccountingTreasuryDetails(voucherId: number): Promise<AccountVoucherDetail[]> {
    const url = `acco/api/v1/search/accountingVouchers/${voucherId}/details`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.get<AccountVoucherDetail[]>(url, { headers }).toPromise();
  }

  public createAccountingTreasury(accountVoucher: AccountVoucher): Promise<number> {
    const url = `acco/api/v1/accountingVouchers`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.post<number>(url, accountVoucher, { headers }).toPromise();
  }

  public updateAccountingTreasury(accountVoucher: AccountVoucher, isSave: boolean): Promise<number> {
    const url = `acco/api/v1/accountingVouchers/${accountVoucher.id}/${isSave}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put<number>(url, accountVoucher, { headers }).toPromise();
  }

  public updateTransationAndDelete(accountVoucherId: number, accountVoucher: AccountVoucher): Promise<number> {
    const url = `acco/api/v1/accountingVouchers/${accountVoucherId}/updateTransationAndDelete`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put<number>(url, accountVoucher, { headers }).toPromise();
  }

  public deleteAccountingTreasury(accountVoucherId: number): Promise<any> {
    const url = `acco/api/v1/accountingVouchers/${accountVoucherId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.delete(url, { headers }).toPromise();
  }

  public authorizeAccountingTreasury(accountVoucherId: number): Promise<void> {
    const url = `acco/api/v1/accountingVouchers/${accountVoucherId}/authorize`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put<void>(url, {}, { headers }).toPromise();
  }

  public unautorizedAccountingTreasury(accountVoucherId: number): Promise<any[]> {
    const url = `acco/api/v1/accountingVouchers/${accountVoucherId}/unauthorize`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put<any[]>(url, null, { headers }).toPromise();
  }

  public cancelAccountingTreasury(accountVoucherId: number): Promise<void> {
    const url = `acco/api/v1/accountingVouchers/${accountVoucherId}/cancel`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put<void>(url, null, { headers }).toPromise();
  }  

  public printAccountingTreasury(accountVoucherId: number): void {
    const url = `${SERVER_URL}/acco/api/v1/search/accountingVouchers/${accountVoucherId}/report?Authorization=Bearer ${this.userService.getAccessToken()}`;
    window.open(url, '_blank');
  }

  public duplicateAccountingTreasury(accountVoucherId: number): Promise<number> {
    const url = `acco/api/v1/accountingVouchers/${accountVoucherId}/duplicate`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.post<number>(url, null, { headers }).toPromise();
  }
  
  public printAccountingVouchers(filters: AccountVoucherFilter, page: number, size: number, bussinessId: number): void {
    const url: string = this.getUrlbyParams(`/acco/api/v1/search/printAccountingTreasury?bussinessId=${bussinessId}&page=${page}&size=${size}&offsetOnly=1`, filters);
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

  private bindPaginator(page: number = 0, size: number = 3): HttpParams {
    let httpParams = new HttpParams();
    return httpParams.set('page', page.toString()).set('offsetOnly', "1").set('size', size.toString());
  }
}
