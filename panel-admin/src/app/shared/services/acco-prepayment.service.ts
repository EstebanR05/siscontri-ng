import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUserService } from 'src/app/shared/services/auth-user.service';
import { PrePaymentFilter } from 'src/app/shared/core/mod-core/models/acco-prepayment.model';

@Injectable({
  providedIn: 'root'
})
export class AccoPrepaymentService {

  constructor(
    private userService: AuthUserService,
    private http: HttpClient
  ) { }

  getPrePyamentPortfolio(filters: PrePaymentFilter, page: number, size: number): Promise<any> {
    let url = `acco/api/v1/search/prePayment?`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    let params = this.bindPaginator(page, size);
    params = params.set("accountsPrePayment", (!!filters.accountsPrePayment).toString())
      .set("accountsPrePaymentProv", (!!filters.accountsPrePaymentProv).toString());

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

    return this.http.get<any>(url, {headers, params}).toPromise();
  }

  bindPaginator(page: number = 0, size: number = 3, rows?: number): HttpParams {
    let httpParams = new HttpParams();
    return httpParams
      .set('page', page.toString())
      .set('offsetOnly', "1")
      .set('size', size.toString());
  }

}
