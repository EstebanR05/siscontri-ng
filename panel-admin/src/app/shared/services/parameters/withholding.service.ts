import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUserService } from 'src/app/shared/services/auth-user.service';
import { Retefunte } from 'src/app/shared/core/mod-core/models/payments-movements.model';

@Injectable({
  providedIn: 'root'
})
export class WithholdingService {

  constructor(
    private http: HttpClient,
    private userService: AuthUserService
  ) { }

  getWithholding(): Promise<Retefunte[]> {
    const url = `prmt/api/v1/search/Withholding`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.get<Retefunte[]>(url, { headers }).toPromise();
  }

  createWithholding(retefunte: Retefunte): Promise<any>{
    const url = `prmt/api/v1/withholding`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.post(url, retefunte, { headers }).toPromise();
  }

  updateWithholding(retefunte: Retefunte, withholdingId: number): Promise<any>{
    const url = `prmt/api/v1/withholding/${withholdingId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put(url, retefunte, { headers }).toPromise();
  }

  deleteWithholding(withholdingId: number): Promise<any>{
    const url = `prmt/api/v1/withholding/${withholdingId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.delete(url, { headers }).toPromise();
  }

}
