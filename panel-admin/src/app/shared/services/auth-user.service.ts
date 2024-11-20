import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationInfo } from 'src/app/shared/core/mod-core/models/application-info.model';
import { Login } from 'src/app/shared/core/mod-core/models/login.model';
import { User } from 'src/app/shared/core/mod-core/models/user.model';
import { BaseComponent } from '../core/base.component';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService extends BaseComponent {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { super() }

  public async validAccessToken(login: Login): Promise<void> {
    const params = new URLSearchParams();
    params.append('username', login.username);
    params.append('password', login.password);
    params.append('grant_type', 'password');
    params.append('client_id', 'siscontri');

    console.log("before response");
    const headers = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', Authorization: 'Basic ' + btoa('siscontri:password') });
    const responseAuth = await this.http.post(`${this.apiUrl}/oauth/token`, params.toString(), { headers }).toPromise();
    console.log("after response");

    this.saveToken(responseAuth, login.username);
    await this.router.navigate(['/dashboard']);
  }

  public checkCredentials(): boolean {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['/login']);
    }

    return true;
  }

  public getAccessToken(): string {
    if (this.checkCredentials()) {
      return localStorage.getItem('access_token') || "";
    }

    throw new Error('no se encontro el token de acceso');
  }

  public getInfoUser(): User {
    if (localStorage.getItem('user_info')) {
      return JSON.parse(localStorage.getItem('user_info') || "");
    }

    throw new Error('no se encontro informacion del usuario');
  }

  public async getCurrentUser(): Promise<User> {
    if (localStorage.getItem('user_info')) {
      return JSON.parse(localStorage.getItem('user_info') || "");
    }

    if (this.checkCredentials()) {
      const url = `secu/api/v1/search/users/${localStorage.getItem('username')}`;
      const user: User = await this.http.get<User>(url).toPromise() || new User();
      localStorage.setItem('user_info', JSON.stringify(user));
      return user;
    }

    throw new Error('No hay credenciales para acceder a la API');
  }

  public getApplicationInfo(): Promise<any> {
    const url = `secu/api/v1/search/applicationInfo`;
    return this.http.get<ApplicationInfo>(url).toPromise();
  }

  public logout(): void {
    this.clearStorage();
    this.router.navigate(['/login']);
  }

  private clearStorage(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('user_info');
  }

  private saveToken(token: any, username: string): void {
    console.log("save token");
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('username', username);
    localStorage.setItem('expires_in', token.expires_in);
  }
}
