import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUserService } from 'src/app/shared/services/auth-user.service';
import { Document } from 'src/app/shared/core/mod-core/models/document.model';
import { CostCenter } from 'src/app/shared/core/mod-core/models/cost-center.model';
import { PaymentsMovements } from 'src/app/shared/core/mod-core/models/payments-movements.model';
import { SellPurchase } from 'src/app/shared/core/mod-core/models/sell-purchase.model';
import { SellTaxes } from 'src/app/shared/core/mod-core/models/sell-taxes.model';
import { CostSales } from 'src/app/shared/core/mod-core/models/cost-sales.model';
import { DetailsExogenous } from 'src/app/shared/core/mod-core/models/details-exogenous.model';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  constructor(
    private http: HttpClient,
    private userService: AuthUserService
  ) { }

  createDocuments(document: Document): Promise<any> {
    const url = `prmt/api/v1/documents`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.post(url, document, { headers }).toPromise();
  }

  updateDocuments(document: Document, documentId: number): Promise<any> {
    const url = `prmt/api/v1/documents/${documentId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.put(url, document, { headers }).toPromise();
  }

  deleteDocuments(documentId: number): Promise<any> {
    const url = `prmt/api/v1/documents/${documentId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.delete(url, { headers }).toPromise();
  }

  getDocuments(): Promise<Document[]> {
    const url = `prmt/api/v1/search/documents`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.get<Document[]>(url, { headers }).toPromise();
  }

  //documents blocked
  getDocumentsBlocked(): Promise<Document[]> {
    const url = `prmt/api/v1/search/documentsBlocked`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.get<Document[]>(url, { headers }).toPromise();
  }

  changeBlockParamsDocuments(document: Document, documentId: number): Promise<any> {
    const url = `prmt/api/v1/documents/changeBlockParamsDocuments/${documentId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put(url, document, { headers }).toPromise();
  }

  createDocumentsBlocked(document: Document, isChangeCode: boolean): Promise<any> {
    const url = `prmt/api/v1/documentsBlocked/${isChangeCode}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.post(url, document, { headers }).toPromise();
  }

  updateDocumentsBlocked(document: Document, documentId: number, previus: Document): Promise<any> {
    let params = this.bindPaginator(100, 100);

    params = params.append("previusCode", previus.code.toString());
    params = params.append("code", document.code.toString());
    params = params.append("startDate", this.formatDate(new Date(document.startDate)));
    params = params.append("endDate", this.formatDate(new Date(document.endDate)));

    const url = `prmt/api/v1/documentsBlocked/${documentId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put(url, params, { headers }).toPromise();
  }

  formatDate(date: Date): string {
    // Obtenemos los componentes de la fecha/hora
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses son base 0, así que sumamos 1
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Construimos la cadena de fecha y hora en formato "yyyy-MM-dd HH:mm:ss"
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  bindPaginator(page: number = 0, size: number = 3): HttpParams {
    let httpParams = new HttpParams();
    return httpParams.set('page', page.toString()).set('offsetOnly', "1").set('size', size.toString());
  }

  deleteDocumentsBlocked(documentId: number): Promise<any> {
    const url = `prmt/api/v1/documentsBlocked/${documentId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.delete(url, { headers }).toPromise();
  }

  //costCenter
  createCostCenters(costCenter: CostCenter): Promise<any> {
    const url = `prmt/api/v1/costCenters`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.post(url, costCenter, { headers }).toPromise();
  }

  updateCostCenters(costCenter: CostCenter, costCenterId: number): Promise<any> {
    const url = `prmt/api/v1/costCenters/${costCenterId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.put(url, costCenter, { headers }).toPromise();
  }

  deleteCostCenters(costCenterId: number): Promise<any> {
    const url = `prmt/api/v1/costCenters/${costCenterId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.delete(url, { headers }).toPromise();
  }

  getCostCenters(): Promise<CostCenter[]> {
    const url = `prmt/api/v1/search/costCenters`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.get<CostCenter[]>(url, { headers }).toPromise();
  }

  getExogenous(): Promise<Document[]> {
    const url = `prmt/api/v1/search/exogenous`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.get<Document[]>(url, { headers }).toPromise();
  }

  createExogenous(detailsExogenous: DetailsExogenous): Promise<any> {
    const url = `prmt/api/v1/exogenous`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.post(url, detailsExogenous, { headers }).toPromise();
  }

  createDefaultExogenous(): Promise<any> {
    const url = `prmt/api/v1/exogenous/defaults`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.post(url, {}, { headers }).toPromise();
  }

  updateExogenous(detailsExogenous: DetailsExogenous, exogenousId: number): Promise<any> {
    const url = `prmt/api/v1/exogenous/${exogenousId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.put(url, detailsExogenous, { headers }).toPromise();
  }

  deleteExogenous(exogenousId: number): Promise<any> {
    const url = `prmt/api/v1/exogenous/${exogenousId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.delete(url, { headers }).toPromise();
  }

  getCostSales(): Promise<CostSales[]> {
    const url = `prmt/api/v1/search/costSales`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.get<CostSales[]>(url, { headers }).toPromise();
  }

  createCostSales(costSales: CostSales): Promise<any> {
    const url = `prmt/api/v1/costSales`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.post(url, costSales, { headers }).toPromise();
  }

  updateCostSales(costSales: CostSales, costSaleId: number): Promise<any> {
    const url = `prmt/api/v1/costSales/${costSaleId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.put(url, costSales, { headers }).toPromise();
  }

  deleteCostSales(costSaleId: number): Promise<any> {
    const url = `prmt/api/v1/costSales/${costSaleId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.delete(url, { headers }).toPromise();
  }

  createSellPurchase(sellTaxes: SellTaxes): Promise<any> {
    const url = `prmt/api/v1/sellCategories`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.post(url, sellTaxes, { headers }).toPromise();
  }

  createSellTaxes(sellTaxes: SellTaxes): Promise<any> {
    const url = `prmt/api/v1/sellTaxes`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.post(url, sellTaxes, { headers }).toPromise();
  }

  updateSellPurchase(sellTaxes: SellTaxes, sellTaxesId: number): Promise<any> {
    const url = `prmt/api/v1/sellCategories/${sellTaxesId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.put(url, sellTaxes, { headers }).toPromise();
  }

  updateSellTaxes(sellTaxes: SellTaxes, sellTaxesId: number): Promise<any> {
    const url = `prmt/api/v1/sellTaxes/${sellTaxesId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.put(url, sellTaxes, { headers }).toPromise();
  }

  deleteSellTaxes(sellTaxesId: number): Promise<any> {
    const url = `prmt/api/v1/sellTaxes/${sellTaxesId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.delete(url, { headers }).toPromise();
  }

  deleteSellPurchase(sellTaxesId: number): Promise<any> {
    const url = `prmt/api/v1/sellCategories/${sellTaxesId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.delete(url, { headers }).toPromise();
  }

  getSellTaxes(): Promise<SellTaxes[]> {
    const url = `prmt/api/v1/search/sellTaxes`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.get<SellTaxes[]>(url, { headers }).toPromise();
  }

  getSellPurchase(): Promise<SellPurchase[]> {
    const url = `prmt/api/v1/search/sellCategories`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.get<SellPurchase[]>(url, { headers }).toPromise();
  }

  createPaymentsMovements(paymentsMovements: PaymentsMovements): Promise<any> {
    const url = `prmt/api/v1/paymentsMovements`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.post(url, paymentsMovements, { headers }).toPromise();
  }

  updatePaymentsMovements(paymentsMovements: PaymentsMovements, paymentsMovementsId: number): Promise<any> {
    const url = `prmt/api/v1/paymentsMovements/${paymentsMovementsId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.put(url, paymentsMovements, { headers }).toPromise();
  }

  deletePaymentsMovements(paymentsMovementsId: number): Promise<any> {
    const url = `prmt/api/v1/paymentsMovements/${paymentsMovementsId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.delete(url, { headers }).toPromise();
  }

  getPaymentsMovements(): Promise<PaymentsMovements[]> {
    const url = `prmt/api/v1/search/paymentsMovements`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.get<PaymentsMovements[]>(url, { headers }).toPromise();
  }
}
