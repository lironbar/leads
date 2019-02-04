import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    defaultDuration = 2000;
    defaultVerticalPosition = 'top';
    defaultHorizontalPosition = 'end';
    constructor(  private snackBar: MatSnackBar) {}

    success(message, config?, action?) {
        config = config || {};
        this.snackBar.open(
            message,
            action,
            {
                duration: config.duration || this.defaultDuration,
                verticalPosition: config.vertical || this.defaultVerticalPosition,
                horizontalPosition: config.horizontal || this.defaultHorizontalPosition,
                panelClass: ['success-snack-bar']
            });
    }

    error(message, config?, action?) {
        config = config || {};
        this.snackBar.open(
            message,
            action,
            {
                duration: config.duration || this.defaultDuration,
                verticalPosition: config.vertical || this.defaultVerticalPosition,
                horizontalPosition: config.horizontal || this.defaultHorizontalPosition,
                panelClass: ['error-snack-bar']
            });
    }
}
