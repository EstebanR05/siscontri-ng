import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthUserService } from 'src/app/shared/services/auth-user.service';
import { AccountAccounting } from "src/app/shared/core/mod-core/models/account-accounting.model";
import { IdCodeName } from "src/app/shared/core/mod-core/models/id-code-name.model";
import { AccountNode } from "src/app/shared/core/mod-core/models/account-node.model";

@Injectable({
  providedIn: 'root'
})
export class AccountingAccountsService {

  constructor(
    private http: HttpClient,
    private userService: AuthUserService
  ) { }

  createAccountingAccount(accountAccounting: AccountAccounting): Promise<number> {
    const url = `acco/api/v1/accountingAccounts`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.post<number>(url, accountAccounting, { headers }).toPromise();
  }

  deleteAccountingAccount(accountId: number): Promise<any> {
    const url = `acco/api/v1/accountingAccounts/${accountId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.delete(url, { headers }).toPromise();
  }

  updateAccountingAccount(accountAccounting: AccountAccounting): Promise<any> {
    const url = `acco/api/v1/accountingAccounts/${accountAccounting.id}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.put(url, accountAccounting, { headers }).toPromise();
  }

  findAccountTypes(): Promise<IdCodeName[]> {
    const url = `prmt/api/v1/search/accountTypes`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.get<IdCodeName[]>(url, { headers }).toPromise();
  }

  findAccountingAccount(): Promise<AccountNode[]> {
    const url = `acco/api/v1/search/accountingAccounts`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.get<AccountNode[]>(url, { headers }).toPromise();
  }

  updateAcceptMovements(accountId: number, val: boolean): Promise<any> {
    const url = `acco/api/v1/accountingAccounts/${accountId}/acceptMovements/${val}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.put(url, {}, { headers }).toPromise();
  }

  updateAcceptDiference(accountId: number, val: boolean): Promise<any> {
    const url = `acco/api/v1/accountingAccounts/${accountId}/acceptDiference/${val}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put(url, {}, { headers }).toPromise();
  }

  updateCheckMovements(accountId: number, accounting: AccountAccounting): Promise<any> {
    const url = `acco/api/v1/accountingAccounts/${accountId}/movements`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
      
    return this.http.put(url, {
      third: accounting.third,
      costCenter: accounting.costCenter,
      accountsReceivable: accounting.accountsReceivable,
      accountsPayable: accounting.accountsPayable,
      accountPrePayment: accounting.accountPrePayment,
      accountPrePaymentProvider: accounting.accountPrePaymentProvider,
      contrary: accounting.contrary,
      niif: accounting.niif
    }, { headers }).toPromise();
  }
}
