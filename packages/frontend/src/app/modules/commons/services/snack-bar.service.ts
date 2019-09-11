import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    defaultDuration = 3000;
    defaultVerticalPosition = 'top';
    defaultHorizontalPosition = 'end';
    constructor(
        private snackBar: MatSnackBar,
        private translate: TranslateService
    ) {}

    success(message, config?, action?) {
        config = config || {};
        this.translate.get(message, {}).subscribe((translatedMessage: string) => {
            this.snackBar.open(
                translatedMessage,
                action,
                {
                    duration: config.duration || this.defaultDuration,
                    verticalPosition: config.vertical || this.defaultVerticalPosition,
                    horizontalPosition: config.horizontal || this.defaultHorizontalPosition,
                    panelClass: ['success-snack-bar']
                });
        });
    }

    error(message, config?, action?) {
        config = config || {};
        this.translate.get(message, {}).subscribe((translatedMessage: string) => {
            this.snackBar.open(
                translatedMessage,
                action,
                {
                    duration: config.duration || this.defaultDuration,
                    verticalPosition: config.vertical || this.defaultVerticalPosition,
                    horizontalPosition: config.horizontal || this.defaultHorizontalPosition,
                    panelClass: ['error-snack-bar']
                });
        });
    }
}
