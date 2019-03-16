import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService} from '../../modules/commons/services/loader.service';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
    constructor(
        private loaderService: LoaderService,
        private router: Router
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.showLoader();
        req = req.clone({
            withCredentials: true
        });
        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.onEnd();
                }
            },
            (err: any) => {
                this.hideLoader();

                if (err.status === 403) {
                    this.navigateTo('403');
                }
                if (err.status === 404) {
                    this.navigateTo('404');
                }
                if (err.status === 500) {
                    this.navigateTo('500');
                }
            }));
    }
    private onEnd(): void {
        this.hideLoader();
    }
    private showLoader(): void {
        this.loaderService.show();
    }
    private hideLoader(): void {
        this.loaderService.hide();
    }
    private navigateTo(path) {
        this.router.navigate([path]);
    }
}