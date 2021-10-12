import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

	public encrypt(data: Object) {
		return CryptoJS.AES.encrypt(JSON.stringify(data), 'secret').toString();
	}

	public decrypt(data: string) {
		const bytes = CryptoJS.AES.decrypt(data, 'secret');
		if (bytes.toString()) {
			return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		}
	}
}
