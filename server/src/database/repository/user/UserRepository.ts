import User from '../../models/user/User';

/**
 * User repository class provides methods to interact with database.
 */
export default class UserRepository {

	/**
	 * Search for multiple user instances. Exclude private user information (id, email, password).
	 * 
	 * @returns {Promise<User[] | null>} all the user instances
	 */
	static findAllPublic = async (): Promise<User[] | null> => {
		try {
			const users = await User.findAll({
				attributes: {
					exclude: ['id', 'email', 'password']
				}
			});
			return users;
		} catch (error) {
			throw new Error(`Error in findAllPublic: ${error}`);
		}
	}

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

	/**
	 * Search for a single user instance, based on the username and exclude private attributes from instance.
	 * 
	 * @param {string} username username to search
	 * 
	 * @returns {Promise<User | null>} the first user instance found or null if none can be found
	 */
	static findByUsernamePublic = async (username: string): Promise<User | null> => {
		try {
			const user = await User.findOne({
				where: {
					username: username
				},
				attributes: {
					exclude: ['id', 'email', 'password']
				}
			});
			return user;
		} catch (error) {
			throw new Error(`Error in findByUsernamePublic: ${error}`);
		}
	}

}