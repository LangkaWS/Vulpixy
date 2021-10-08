export class ApiResponse {

	private isSuccess;
	private result;
	private error;

	constructor(isSuccess: boolean, result: any, error: any) {
		this.isSuccess = isSuccess;
		this.result = result;
		this.error = error;
	}

}