import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUserService } from 'src/app/shared/services/auth-user.service';
import { TransactionPortfolioFilter } from 'src/app/shared/core/mod-core/models/transaction-portfolio.model';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http: HttpClient,
    private userService: AuthUserService
  ) { }

  getTransactionPortfolio(filters: TransactionPortfolioFilter, page: number, size: number): Promise<any> {
    let url = `acco/api/v1/search/transactionsPortfolio?`;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    let params = this.bindPaginator(page, size);

    params = params.set("accountsPayable", (!!filters.accountsPayable).toString())
      .set("accountsReceivable", (!!filters.accountsReceivable).toString());

    if (filters.contacts) {
      const contactIds = filters.contacts.map(o => o.id);
      url += `contactIds=${contactIds}&`;
    }

    if (filters.branchOfficesId) {
      url += `branchOfficesId=${filters.branchOfficesId}&`;
    }

    if (filters.invoicedNumber) {
      url += `invoicedNumber=${filters.invoicedNumber}`;
    }

    return this.http.get<any>(url, { headers, params }).toPromise();
  }

  public getTransactionsPortfolioReport(filters: TransactionPortfolioFilter, page: number = 0, size: number = 200): void {
    const url: string = this.bindingTransactionPortfolioFilter(`/acco/api/v1/report/transactionsPortfolio?page=${page}&size=${size}&offsetOnly=1`, filters);
    window.open(url, '_blank');
  }

  public getTransactionsPortfolioExport(filters: TransactionPortfolioFilter, page: number = 0, size: number = 200): void {
    const url: string = this.bindingTransactionPortfolioFilter(`/acco/api/v1/report/transactionsPortfolio/export?page=${page}&size=${size}&offsetOnly=1`, filters);
    window.open(url, '_blank');
  }

  private bindingTransactionPortfolioFilter(api: string, filters: TransactionPortfolioFilter): string {
    let url: string = `${SERVER_URL}${api}&`;

    url += `accountsPayable=${(!!filters.accountsPayable).toString()}&`;
    url += `accountsReceivable=${(!!filters.accountsReceivable).toString()}&`;

    if (filters.contacts) {
      const contactIds = filters.contacts.map(o => o.id);
      url += `contactIds=${contactIds}&`;
    }

    if (filters.branchOffices) {
      url += `branchOfficesId=${filters.branchOffices.id.toString()}&`;
    }

    if (filters.invoicedNumber) {
      url += `invoicedNumber=${filters.invoicedNumber.toString()}&`;
    }

    if (filters.accountAccountingStart) {
      url += `documentCodeStart=${filters.accountAccountingStart.code.toString()}&`;
    }

    if (filters.accountAccountingEnd) {
      url += `documentCodeEnd=${filters.accountAccountingEnd.code.toString()}&`;
    }

    if (filters.elaborationDate) {
      url += `elaborationDate=${filters.elaborationDate.toString()}&`;
    }

    if(filters.businessId){
      url += `businessId=${filters.businessId.toString()}&`;
    }

    // Remove the last "&"
    url = url.slice(0, -1);

    return url;
  }

  bindPaginator(page: number = 0, size: number = 3, rows?: number): HttpParams {
    let httpParams = new HttpParams();
    return httpParams
      .set('page', page.toString())
      .set('offsetOnly', "1")
      .set('size', size.toString());
  }
}
