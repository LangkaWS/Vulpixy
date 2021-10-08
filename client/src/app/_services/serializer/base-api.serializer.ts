export abstract class BaseApiSerializer<T> {

	/**
	 * Convert a server object to a T type object.
	 * @param object the object from the server
	 * @returns the object with T type
	 */
	public fromJson(object: any): T {
		return object as T;
	}

	/**
	 * Convert a T type object to a JSON object for server.
	 * @param object 
	 * @returns 
	 */
	public toJson(object: T): any {
		return object;
	}

}