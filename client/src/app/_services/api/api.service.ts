import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/_models/api-response';
import { environment } from 'src/environments/environment';
import { BaseApiSerializer } from '../serializer/base-api.serializer';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService<T> {

	protected get _baseUrl(): string {
		return `${environment.apiURL}/${this._endpoint}`;
	}

  constructor(
		protected readonly _httpClient: HttpClient,
		protected readonly _apiSerializer: BaseApiSerializer<T>,
		@Inject(String) private readonly _endpoint: string
	) { }

	protected convertData(response: ApiResponse): T {
		return this._apiSerializer.fromJson(response.result) as T;
	}

	protected convertDataList(response: ApiResponse): Array<T> {
		return response.result.map((result: any) => this._apiSerializer.fromJson(result) as T);
	}

	public add(item: T) {
		return this._httpClient
			.post(this._baseUrl, this._apiSerializer.toJson(item))
			.pipe(map((data: any) => this.convertData(data)));
	}

	public get(id: string): Observable<T> {
		const url = `${this._baseUrl}/${id}`;

		return this._httpClient
			.get<T>(url)
			.pipe(map((data: any) => this.convertData(data)));
	}

	public getAll(): Observable<Array<T>> {
		return this._httpClient
			.get<Array<T>>(this._baseUrl)
			.pipe(map((data: any) => this.convertDataList(data)));
	}

}
