import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { ErrorDialogService } from "./error-dialog.service";

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
	constructor(
		private _errorDialogService: ErrorDialogService,
		private _zone: NgZone
	) {}

	public handleError(error: any) {
		if (!(error instanceof HttpErrorResponse)) {
			this._zone.run(() => 
				this._errorDialogService.openDialog(error?.message, error?.status)
			);
		}
		
		console.error('Error from global error handler', error);
	}
}