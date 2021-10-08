import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.sass']
})
export class ErrorDialogComponent implements OnInit {

  constructor(
		@Inject(MAT_DIALOG_DATA) public data: { status: number, message: string }
	) { }

  ngOnInit(): void {
  }

}