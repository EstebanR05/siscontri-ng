import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthUserService } from 'src/app/shared/services/auth-user.service';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpInterceptor implements HttpInterceptor {

  constructor(
    private authUserService: AuthUserService
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Valid login.
    const apiReq = req.clone({ url: req.url.search(/assets/gi) === -1 ? `${SERVER_URL}/${req.url}` : `${req.url}` });
    return next.handle(apiReq).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error.error !== 'unauthorized') {
          this.authUserService.logout();
        } else {
          return throwError(error);
        }
      })
    );
  }
}
