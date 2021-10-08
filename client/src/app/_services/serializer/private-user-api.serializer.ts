import { Injectable } from "@angular/core";
import { PrivateUser } from "src/app/_models/private-user";
import { BaseApiSerializer } from "./base-api.serializer";

@Injectable({
  providedIn: 'root'
})
export class PrivateUserApiSerializer extends BaseApiSerializer<PrivateUser> {

	constructor() {
		super();
	}

	public fromJson(object: any): PrivateUser {
		return {
			username: object.username,
			email: object.email,
			password: object.password
		} as PrivateUser;
	}

	public toJson(object: PrivateUser): any {
		return {
			username: object.username,
			email: object.email,
			password: object.password
		}
	}

}