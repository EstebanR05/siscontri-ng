import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/environments/environment';
import { AuthUserService } from 'src/app/shared/services/auth-user.service';
import { AccountVoucherDetail } from 'src/app/shared/core/mod-core/models/account-voucher-detail.model';
import { AccountVoucher, AccountVoucherFilter } from 'src/app/shared/core/mod-core/models/account-voucher.model';
import { ReportsFilter } from 'src/app/shared/core/mod-core/models/reports-filter.model';
import { TransactionFilter } from 'src/app/shared/core/mod-core/models/transaction-filter.model';
import { Transaction } from 'src/app/shared/core/mod-core/models/transaction.model';
import { payrollSetup } from '../core/mod-core/models/prmt-payroll-setup.model';

@Injectable({
  providedIn: 'root'
})
export class AccountingVoucherService {

  constructor(
    private http: HttpClient,
    private userService: AuthUserService
  ) {
  }

  public getAccountingVouchers(filters: AccountVoucherFilter, page: number, size: number): Promise<any> {
    const url = `acco/api/v1/search/accountingVouchers`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    let params = this.bindingParams(filters, page, size);
    return this.http.get<any>(url, { headers, params }).toPromise();
  }

  getAccountingVoucher(voucherId: number): Promise<AccountVoucher> {
    const url = `acco/api/v1/search/accountingVouchers/${voucherId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.get<AccountVoucher>(url, { headers }).toPromise();
  }

  getAccountingVoucherDetails(voucherId: number): Promise<AccountVoucherDetail[]> {
    const url = `acco/api/v1/search/accountingVouchers/${voucherId}/details`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.get<AccountVoucherDetail[]>(url, { headers }).toPromise();
  }

  getTransactions(documentId: number, branchOfficesId: number, elaborationDateRange: Date[], noDoc: string): Promise<Transaction[]> {
    const url = `acco/api/v1/search/transactions`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    let params = new HttpParams();

    if (documentId) {
      params = params.append('documentId', documentId.toString());
    }

    if (branchOfficesId) {
      params = params.append('branchOfficesId', branchOfficesId.toString());
    }

    if (elaborationDateRange) {
      const datesRage = elaborationDateRange.map(item => item ? item.getTime() : '');
      params = params.append('startDate', datesRage[0]?.toString());
      params = params.append('endDate', datesRage[1]?.toString());
    }

    if (noDoc) {
      params = params.append('noDoc', noDoc.toString());
    }

    return this.http.get<Transaction[]>(url, { headers, params }).toPromise();
  }

  getPayroll(documentId: number, branchOfficesId: number, elaborationDateRange: Date[], periodo: string): Promise<payrollSetup[]> {
    const url = `acco/api/v1/search/payroll`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    let params = new HttpParams();

    if (documentId) {
      params = params.append('documentId', documentId.toString());
    }

    if (branchOfficesId) {
      params = params.append('branchOfficesId', branchOfficesId.toString());
    }

    if (elaborationDateRange) {
      const datesRage = elaborationDateRange.map(item => item ? item.getTime() : '');
      params = params.append('startDate', datesRage[0]?.toString());
      params = params.append('endDate', datesRage[1]?.toString());
    }

    if (periodo) {
      params = params.append('periodo', periodo.toString());
    }

    return this.http.get<payrollSetup[]>(url, { headers, params }).toPromise();
  }

  getConscutive(documentId: number): Promise<number> {
    const url = `acco/api/v1/search/accountingVouchers/documents/${documentId}/consecutive`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.get<number>(url, { headers }).toPromise();
  }

  getConscutiveList(documentId: number): Promise<number> {
    const url = `acco/api/v1/search/accountingVouchers/documents/${documentId}/consecutiveList`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.get<number>(url, { headers }).toPromise();
  }

  createAccountingVoucher(accountVoucher: AccountVoucher): Promise<number> {
    const url = `acco/api/v1/accountingVouchers`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.post<number>(url, accountVoucher, { headers }).toPromise();
  }

  duplicateAccountingVoucher(accountVoucherId: number): Promise<number> {
    const url = `acco/api/v1/accountingVouchers/${accountVoucherId}/duplicate`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.post<number>(url, null, { headers }).toPromise();
  }

  updateAccountingVoucher(accountVoucher: AccountVoucher, isSave: boolean): Promise<number> {
    const url = `acco/api/v1/accountingVouchers/${accountVoucher.id}/${isSave}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put<number>(url, accountVoucher, { headers }).toPromise();
  }

  authorizeAccountingVoucher(accountVoucherId: number): Promise<void> {
    const url = `acco/api/v1/accountingVouchers/${accountVoucherId}/authorize`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put<void>(url, {}, { headers }).toPromise();
  }

  public traslateAccounting(reportsFilter: ReportsFilter): Promise<void> {
    const url = `acco/api/v1/accounting/transferAccount`;
    const params = this.getUrlByFiltersByViewTThidTable(reportsFilter);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put<void>(url, params, { headers }).toPromise();
  }

  public ExportTraslateAccounting(reportsFilter: ReportsFilter): void {
    const url = this.getUrlByFilters(`/acco/api/v1/accounting/transferAccount/export?`, reportsFilter);
    window.open(url, '_blank');
  }

  _printAccountingVoucherThirdBalanceView(reportsFilter: ReportsFilter): Promise<any> {
    const url = `acco/api/v1/report/accountingVouchersThirdBalanceView`;
    const params = this.getUrlByFiltersByViewTThidTable(reportsFilter);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.get<any>(url, { headers, params }).toPromise();
  }

  updateTransationAndDelete(accountVoucherId: number, accountVoucher: AccountVoucher): Promise<number> {
    const url = `acco/api/v1/accountingVouchers/${accountVoucherId}/updateTransationAndDelete`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put<number>(url, accountVoucher, { headers }).toPromise();
  }

  cancelAccountingVoucher(accountVoucherId: number): Promise<void> {
    const url = `acco/api/v1/accountingVouchers/${accountVoucherId}/cancel`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.put<void>(url, null, { headers }).toPromise();
  }

  unautorizedAccountingVoucher(accountVoucherId: number): Promise<any[]> {
    const url = `acco/api/v1/accountingVouchers/${accountVoucherId}/unauthorize`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put<any[]>(url, null, { headers }).toPromise();
  }

  deleteAccountingVoucher(accountVoucherId: number): Promise<any> {
    const url = `acco/api/v1/accountingVouchers/${accountVoucherId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.delete(url, { headers }).toPromise();
  }

  processTransactions(transactionFilter: TransactionFilter): Promise<any[]> {
    const url = `acco/api/v1/accountingVouchers/processTransactions`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.post<any[]>(url, transactionFilter, { headers }).toPromise();
  }

  processPayroll(filter: payrollSetup): Promise<any[]> {
    const url = `acco/api/v1/accountingVouchers/processPayroll`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.post<any[]>(url, filter, { headers }).toPromise();
  }

  printAccountingVoucher(accountVoucherId: number): void {
    const url = `${SERVER_URL}/acco/api/v1/search/accountingVouchers/${accountVoucherId}/report?Authorization=Bearer ${this.userService.getAccessToken()}`;
    window.open(url, '_blank');
  }

  public printDetailsVoucher(voucherId: number): void {
    const url = `${SERVER_URL}/acco/api/v1/search/accountingVouchers/${voucherId}/detailsReport?Authorization=Bearer ${this.userService.getAccessToken()}`;
    window.open(url, '_blank');
  }

  public printAccountingVoucherThirdDetailExcel(reportsFilter: ReportsFilter, isExport: boolean): void {
    const url = this.getUrlByFilters(`/acco/api/v1/report/accountingVouchersThird${isExport ? '/exportDetailExcel' : ''}?`, reportsFilter);
    window.open(url, '_blank');
  }

  printAccountingVoucherThird(reportsFilter: ReportsFilter, isExport: boolean): void {
    const url = this.getUrlByFilters(`/acco/api/v1/report/accountingVouchersThird${isExport ? '/export' : ''}?`, reportsFilter);
    window.open(url, '_blank');
  }

  public printAccountingVouchers(filters: AccountVoucherFilter, page: number, size: number, bussinessId: number): void {
    const url: string = this.getUrlbyParams(`/acco/api/v1/search/printAccountingVouchers?bussinessId=${bussinessId}&page=${page}&size=${size}&offsetOnly=1`, filters);
    window.open(url, '_blank');
  }

  printAccountingVoucherThirdBalance(reportsFilter: ReportsFilter, isExport: boolean): void {
    const url = this.getUrlByFilters(`/acco/api/v1/report/accountingVouchersThirdBalance${isExport ? '/export' : ''}?`, reportsFilter);
    window.open(url, '_blank');
  }

  printAccountingVoucherThirdBalanceView(reportsFilter: ReportsFilter): Promise<any> {
    const url = `acco/api/v1/report/accountingVouchersThirdBalanceView`;
    const params = this.getUrlByFiltersByViewTThidTable(reportsFilter);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.get<any>(url, { headers, params }).toPromise();
  }

  printAccountingVoucherAuxiliary(reportsFilter: ReportsFilter, isExport: boolean): void {
    const url = this.getUrlByFilters(`/acco/api/v1/report/accountingVouchersAuxiliary${isExport ? '/export' : ''}?`, reportsFilter);
    window.open(url, '_blank');
  }

  printAccountingVoucherAuxiliaryBalance(reportsFilter: ReportsFilter, isExport: boolean): void {
    const url = this.getUrlByFilters(`/acco/api/v1/report/accountingVouchersAuxiliaryBalance${isExport ? '/export' : ''}?`, reportsFilter);
    window.open(url, '_blank');
  }

  printAccountingVoucherClassification(reportsFilter: ReportsFilter, isExport: boolean): void {
    const url = this.getUrlByFilters(`/acco/api/v1/report/accountingVouchersClassification${isExport ? '/export' : ''}?`, reportsFilter);
    window.open(url, '_blank');
  }

  printAccountingIntegralResult(reportsFilter: ReportsFilter, isExport: boolean): void {
    const url = this.getUrlByFilters(`/acco/api/v1/report/accountingIntegralResult${isExport ? '/export' : ''}?`, reportsFilter);
    window.open(url, '_blank');
  }

  printReportExogenous(reportsFilter: ReportsFilter): void {
    const url = this.getUrlByFilters(`/acco/api/v1/report/exogenous?`, reportsFilter);
    window.open(url, '_blank');
  }

  private getUrlByFilters(api: string, reportsFilter: ReportsFilter): string {
    let url = `${SERVER_URL}${api}`;

    if (reportsFilter.accountAccountingStart) {
      url += `documentCodeStart=${reportsFilter.accountAccountingStart.code}&`;
      url += `acacIdStart=${reportsFilter.accountAccountingStart.id}&`;
    }

    if (reportsFilter.accountAccountingEnd) {
      url += `documentCodeEnd=${reportsFilter.accountAccountingEnd.code}&`;
      url += `acacIdEnd=${reportsFilter.accountAccountingEnd.id}&`;
    }

    if (reportsFilter.elaborationDate) {
      url += `endDate=${reportsFilter.elaborationDate.getTime().toString()}&`;
    }

    if (reportsFilter.elaborationDateRange) {
      const datesRage = reportsFilter.elaborationDateRange.map(item => item ? item.getTime() : '');
      url += `startDate=${datesRage[0]?.toString()}&endDate=${datesRage[1]?.toString()}&`;
    }

    if (reportsFilter.contacts) {
      const contactIds = reportsFilter.contacts.map(o => o.id);
      url += `contacts=${contactIds}&`;
    }

    if (reportsFilter.accounts) {
      const accounts = reportsFilter.accounts.map(o => o.code);
      url += `accounts=${accounts}&`;
    }

    if (reportsFilter.branchOffices) {
      url += `branchOfficesId=${reportsFilter.branchOffices.id}&`;
    }

    if (reportsFilter.costCenters) {
      url += `costCenterId=${reportsFilter.costCenters.id}&`;
    }

    if (reportsFilter.format) {
      url += `formatId=${reportsFilter.format.id}&`;
    }

    if (reportsFilter.typeInform != null || reportsFilter.typeInform != undefined) {
      url += `typeInform=${reportsFilter.typeInform}&`;
    }

    url += `businessId=${reportsFilter.businessId}`;

    return url;
  }

  private getUrlByFiltersByViewTThidTable(reportsFilter: ReportsFilter): any {
    let params = this.bindPaginator(0, 0);

    if (reportsFilter.accountAccountingStart) {
      params = params.append('documentCodeStart', reportsFilter.accountAccountingStart.code.toString());
      params = params.append('acacIdStart', reportsFilter.accountAccountingStart.id.toString());
    }

    if (reportsFilter.accountAccountingEnd) {
      params = params.append('documentCodeEnd', reportsFilter.accountAccountingEnd.code.toString());
      params = params.append('acacIdEnd', reportsFilter.accountAccountingEnd.id.toString());
    }

    if (reportsFilter.elaborationDate) {
      params = params.append('endDate', reportsFilter.elaborationDate.getTime().toString());
    }

    if (reportsFilter.elaborationDateRange) {
      const datesRage = reportsFilter.elaborationDateRange.map(item => item ? item.getTime() : '');
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

  private bindingParams(filters: AccountVoucherFilter, page: number, size: number): HttpParams {
    let params: HttpParams = this.bindPaginator(page, size);

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
    let httpParams: HttpParams = new HttpParams();
    return httpParams.set('page', page.toString()).set('offsetOnly', '1').set('size', size.toString());
  }
}
