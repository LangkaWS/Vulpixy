import { DataTypes, Model, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../../../config/env';

/**
 * Describe a user.
 * 
 * This class describes a user and provides methods to interact with the user.
 */
class User extends Model {

	public username!: string;
	public email!: string;
	public password!: string;

	public static initialize = (sequelize: Sequelize): void => {
		User.init({
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			username: {
				type: DataTypes.STRING(20),
				allowNull: false,
				unique: true
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true
				}
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false
			}
		}, {
			sequelize,
			timestamps: true,
			updatedAt: false,
		});
	}

	/**
	 * Check if the the provided password is the same as the users's one.
	 * 
	 * @param {string} password the password to check
	 * 
	 * @returns `true` is the provided password is the same as the users's one or `false` if not
	 */
	public authenticate = async (password: string): Promise<boolean> => {
		return await bcrypt.compare(password, this.password);
	}

	/**
	 * Create a JSON Web Token for the user.
	 * 
	 * @returns {string} JSON Web Token string payload
	 */
	public getToken = (): string => {
		const secret = env().SECRET;
		const payload = { username: this.username };
		return jwt.sign(payload, secret);
	}

}

export default User;