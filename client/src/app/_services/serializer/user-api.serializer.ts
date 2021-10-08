import { Injectable } from "@angular/core";
import { User } from "src/app/_models/user";
import { BaseApiSerializer } from "./base-api.serializer";

@Injectable({
  providedIn: 'root'
})
export class UserApiSerializer extends BaseApiSerializer<User> {

	constructor() {
		super();
	}

	public fromJson(object: any): User {
		return {
			username: object.username,
			createdAt: new Date(object.createdAt)
		} as User;
	}

	public toJson(object: User): any {
		return {
			username: object.username,
			createdAt: object.createdAt.toISOString()
		}
	}


}