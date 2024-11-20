import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUserService } from 'src/app/shared/services/auth-user.service';
import { payrollSetup } from '../../core/mod-core/models/prmt-payroll-setup.model';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  constructor(
    private http: HttpClient,
    private userService: AuthUserService
  ) { }

  public getAllPayroll(): Promise<payrollSetup[]> {
    const url = `prmt/api/v1/search/payroll`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.get<payrollSetup[]>(url, { headers }).toPromise();
  }

  public createPayroll(body: payrollSetup): Promise<any>{
    const url = `prmt/api/v1/payroll`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.post(url, body, { headers }).toPromise();
  }

  public updatePayroll(body: payrollSetup, id: number): Promise<any>{
    const url = `prmt/api/v1/payroll/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.put(url, body, { headers }).toPromise();
  }

  public deletePayroll(id: number): Promise<any>{
    const url = `prmt/api/v1/payroll/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getAccessToken()}`);
    return this.http.delete(url, { headers }).toPromise();
  }

}
