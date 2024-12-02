import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationInfo } from 'src/app/shared/core/mod-core/models/application-info.model';
import { Login } from 'src/app/shared/core/mod-core/models/login.model';
import { User } from 'src/app/shared/core/mod-core/models/user.model';
import { BaseComponent } from '../core/base.component';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService extends BaseComponent {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { super() }

  public validAccessToken(login: Login): Observable<void> {
    const params = new URLSearchParams();
    params.append('username', login.username);
    params.append('password', login.password);
    params.append('grant_type', 'password');
    params.append('client_id', 'siscontri');

    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Basic ' + btoa('siscontri:password')
    });

    return this.http.post<any>(`${this.apiUrl}oauth/token`, params.toString(), { headers }).pipe(
      tap((response) => this.saveToken(response, login.username)),
      tap(() => this.router.navigate(['/dashboard'])),
      catchError((error) => {
        console.error('Error en validAccessToken:', error);
        return throwError(() => new Error('Error en autenticación'));
      })
    );
  }

  public getCurrentUser(): Observable<User> {
    const username = localStorage.getItem('username');
    if (!username) {
      return throwError(() => new Error('No hay credenciales almacenadas.'));
    }

    const url = `secu/api/v1/search/users/${username}`;
    return this.http.get<User>(url).pipe(
      tap((user) => localStorage.setItem('user_info', JSON.stringify(user))),
      catchError((error) => {
        console.error('Error obteniendo el usuario:', error);
        return throwError(() => new Error('Error obteniendo la información del usuario'));
      })
    );
  }

  private saveToken(token: any, username: string): void {
    this.clearStorage();
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('username', username);
    localStorage.setItem('expires_in', token.expires_in);
  }

  public checkCredentials(): boolean {
    if (!this.token) {
      this.router.navigate(['/login']);
    }

    return true;
  }

  public getAccessToken(): string {
    if (this.checkCredentials()) {
      return this.token;
    }

    throw new Error('no se encontro el token de acceso');
  }

  public getInfoUser(): User {
    if (localStorage.getItem('user_info')) {
      return JSON.parse(localStorage.getItem('user_info') || "");
    }

    throw new Error('no se encontro informacion del usuario');
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
}
