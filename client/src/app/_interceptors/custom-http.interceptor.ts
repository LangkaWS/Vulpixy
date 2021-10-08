import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
	HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(
		private readonly _tokenStorageService: TokenStorageService,
	) {}

	private getToken() {
		return this._tokenStorageService.getToken() ?? '';
	}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const newRequest = request.clone({
			setHeaders: { 
				'Content-Type': 'application/json',
				'Access-Token': this.getToken()
			}
		});

    return this.requestHandler(newRequest, next);
  }

	private requestHandler(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return next.handle(request).pipe(
			catchError(
				(httpErrorResponse: HttpErrorResponse): Observable<HttpEvent<any>> => {
					let errorMessage = '';

					if (httpErrorResponse.error instanceof ErrorEvent) {
						errorMessage = httpErrorResponse.error.message;
					} else {
						switch (httpErrorResponse.status) {
              case 401:
                console.error('(CustomHttpInterceptor)', 'Unauthorized request');
                break;
              case 403:
                console.error('(CustomHttpInterceptor)', 'Forbidden request');
                break;
              case 404:
                console.error('(CustomHttpInterceptor)', 'Not found');
								break;
							case 409:
                console.error('(CustomHttpInterceptor)', 'Conflict');
								break;
              default:
                errorMessage = httpErrorResponse.message || httpErrorResponse.statusText;
            }
					}

					return throwError(errorMessage);
				}
			)
		)
	}

}
