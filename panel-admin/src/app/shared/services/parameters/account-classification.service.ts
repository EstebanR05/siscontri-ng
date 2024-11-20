import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Classification } from 'src/app/shared/core/mod-core/models/classification.model';
import { AccountClassification } from 'src/app/shared/core/mod-core/models/account-classification.model';
import { AuthUserService } from 'src/app/shared/services/auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class AccountClassificationService {

  constructor(
    private http: HttpClient,
    private userService: AuthUserService
  ) { }

  create(classification: Classification): Promise<number> {
    const url = `acco/api/v1/classifications`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.post<number>(url, classification, { headers }).toPromise();
  }

  createDefault(type: number): Promise<number> {
    const url = `acco/api/v1/classificationsByDefault/${type}`;

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.post<number>(url, {}, { headers }).toPromise();
  }

  createAccountClassification(accountClassification: AccountClassification): Promise<number> {
    const url = `acco/api/v1/classifications/accounts`;

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.post<number>(url, accountClassification, { headers }).toPromise();
  }

  changeOperations(classificationId: number): Promise<void> {
    const url = `acco/api/v1/subclassifications/${classificationId}/changeOperation`;

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.put<void>(url, {}, { headers }).toPromise();
  }
  
  deleteSubclassification(classificationId: number): Promise<void> {
    const url = `acco/api/v1/subclassifications/${classificationId}`;

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.put<void>(url, {}, { headers }).toPromise();
  }

  deleteAccountClassification(accountClassificationId: number): Promise<void> {
    const url = `acco/api/v1/classifications/accounts/${accountClassificationId}`;

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.put<void>(url, {}, { headers }).toPromise();
  }

  findClassifications(order: number): Promise<Classification> {
    const url = `acco/api/v1/search/classifications/order/${order}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.get<Classification>(url, { headers }).toPromise();
  }


  findAccountClassifications(classificationId: number): Promise<AccountClassification[]> {
    const url = `acco/api/v1/search/classifications/${classificationId}/accounts`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userService.getAccessToken()}`);

    return this.http.get<AccountClassification[]>(url, { headers }).toPromise();
  }
}
