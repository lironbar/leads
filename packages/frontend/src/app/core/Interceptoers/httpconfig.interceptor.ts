import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LoaderService} from '../../modules/commons/services/loader.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../modules/commons/services/snack-bar.service';

@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
    constructor(
        private snackBarService: SnackBarService,
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

                if (err.status === 401) {
                    this.navigateTo('401');
                }
                if (err.status === 403) {
                    this.navigateTo('403');
                }
                // if (err.status === 404) {
                //     this.navigateTo('404');
                // }
                if (err.status === 500) {
                    this.snackBarService.error('OOPS, Something went wrong');
                    console.error(err.message)
                    // this.navigateTo('500');
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