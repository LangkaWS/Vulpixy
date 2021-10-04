import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserRepository from '../../database/repository/user/UserRepository';
import User from '../../database/models/user/User';

/**
 * User controller class controls the user data flow.
 * 
 * This class controls registration of users.
 */
export default class UserController {

	/**
	 * Register the user in database.
	 * 
	 * Before registration, the username and the email are formatted (trim and lowercase), the password is hashed.
	 * Check if the username or the email are already in use.
	 * Finally, create the user instance and save it in database.
	 * 
	 * @param {Request}  req the HTTP request
	 * @param {Response} res the HTTP response
	 */
	static register = async (req: Request, res: Response): Promise<void> => {
		try {
			const { username, email, password } = req.body;

			if (!username || !email || !password) {
				res.status(400).send('Missing at least one parameter.');
				return;
			}

			const user = {
				username: this.formatUsername(username),
				email: this.formatEmail(email),
				password: await this.hashPassword(password)
			};

			if (await this.isExistingUsername(username)) {
				res.status(409).send('This username is already in use.');
				return;
			}

			if (await this.isExistingEmail(email)) {
				res.status(409).send('This email is already in use.');
				return;
			}

			await User.create(user);
			res.status(201).end();
			return;

		} catch (error) {
			res.status(500).end();
		}
	}

	/**
	 * Log in the user.
	 * 
	 * Search a user with the provided username, then check if the provided password is the same as the password of the user found.
	 * If everything is ok, send in response a JSON with the username.
	 * 
	 * @param {Request}  req the HTTP request
	 * @param {Response} res the HTTP response
	 */
	static login = async (req: Request, res: Response): Promise<void> => {
		try {
			const { username, password } = req.body;

			if (!username || !password) {
				res.status(400).send('Missing at least one parameter.');
				return;
			}

			const user = await UserRepository.findByUsername(username);

			if (!user) {
				res.status(400).end('Invalid credentials.');
				return;
			}

			const isPasswordCorrect = await user.authenticate(password);
			if (!isPasswordCorrect) {
				res.status(400).end('Invalid credentials.');
				return;
			}

			res.status(200).json({
				username: user.username
			});

		} catch (error) {
			res.status(500).end();
		}
	}

	/**
	 * Get all registered users.
	 * 
	 * Selects all user attributes excluding id, email, password and 'created at' timestamp.
	 * 
	 * @param {Request}  req the HTTP request
	 * @param {Response} res the HTTP response
	 */
	static getAllUsers = async (req: Request, res: Response): Promise<void> => {
		try {
			const users = await User.findAll({
				attributes: {
					exclude: ['id', 'email', 'password', 'createdAt']
				}
			});
			res.status(200).send(JSON.stringify(users, null, 2));
		} catch (error) {
			res.status(500).end();
		}
	}

	/**
	 * Trim the username.
	 * 
	 * @param {string} username the username to format
	 * 
	 * @returns {string} trimmed username
	 */
	private static formatUsername = (username: string): string => {
		return username.trim();
	}

	/**
	 * Trim and put the email to lower case.
	 * 
	 * @param {string} email the email to format
	 * 
	 * @returns {string} trimmed and lowercase email
	 */
	private static formatEmail = (email: string): string => {
		return email.trim().toLowerCase();
	}

	/**
	 * Hash the password with bcrypt.
	 * 
	 * @param {string} password the password to hash
	 * 
	 * @returns {string} hashed password
	 */
	private static hashPassword = (password: string): Promise<string> => {
		return bcrypt.hash(password, 10);
	}

	/**
	 * Check if a user already exist with the provided username.
	 * 
	 * @param {string} username searched username
	 * 
	 * @returns {boolean} `true` if this username is already in use, `false` if not
	 */
	private static isExistingUsername = async (username: string): Promise<boolean> => {
		const user = await UserRepository.findByUsername(username);
		return Boolean(user);
	}

	/**
	 * Check if a user already exist with the provided email.
	 * 
	 * @param {string} email searched email
	 * 
	 * @returns {boolean} `true` if this email is already in use, `false` if not
	 */
	private static isExistingEmail = async (email: string): Promise<boolean> => {
		const user = await UserRepository.findByEmail(email);
		return Boolean(user);
	}

}