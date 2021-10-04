import User from '../../models/user/User';

/**
 * User repository class provides methods to interact with database.
 */
export default class UserRepository {

	/**
	 * Search for a single user instance, based on the username.
	 * 
	 * @param {string} username username to search
	 * 
	 * @returns {Promise<User | null>} the first user instance found or null if none can be found
	 */
	static findByUsername = async (username: string): Promise<User | null> => {
		try {
			const user = await User.findOne({
				where: {
					username: username
				}
			});
			return user;
		} catch (error) {
			throw new Error(`Error in findByUsername: ${error}`);
		}
	}

	/**
	 * Search for a single user instance, based on the email.
	 * 
	 * @param {string} email email to search
	 * 
	 * @returns {Promise<User | null>} the first user instance found or null if none can be found
	 */
	static findByEmail = async (email: string): Promise<User | null> => {
		try {
			const user = await User.findOne({
				where: {
					email: email
				}
			});
			return user;
		} catch (error) {
			throw new Error(`Error in findByEmail: ${error}`);
		}
	}

}