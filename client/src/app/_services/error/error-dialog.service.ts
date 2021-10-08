import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/errors/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

	private _opened = false;

  constructor(private _dialog: MatDialog) { }

	public openDialog(message: string, status: number) {
		if (!this._opened) {
			this._opened = true;
			const dialogRef = this._dialog.open(ErrorDialogComponent, {
				data: { message, status }
			});

			dialogRef.afterClosed().subscribe(() => {
				this._opened = false;
			})
		}
	}
}
