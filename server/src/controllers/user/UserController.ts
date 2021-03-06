import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserRepository from '../../database/repository/user/UserRepository';
import User from '../../database/models/user/User';
import { ApiResponse } from '../../api/ApiResponse';

/**
 * User controller class controls the user data flow.
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
				res.status(400).send(new ApiResponse(false, null, 'MissingParameter'));
				return;
			}

			const user = {
				username: this.formatUsername(username),
				email: this.formatEmail(email),
				password: await this.hashPassword(password)
			};

			if (await this.isExistingUsername(username)) {
				res.status(409).send(new ApiResponse(false, null, 'UsernameAlreadyInUse'));
				return;
			}

			if (await this.isExistingEmail(email)) {
				res.status(409).send(new ApiResponse(false, null, 'EmailAlreadyInUse'));
				return;
			}

			await User.create(user);
			res.status(201).send(new ApiResponse(true, null, null));
			return;

		} catch (error) {
			res.status(500).send(new ApiResponse(false, null, 'InternalError'));
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
				res.status(400).send(new ApiResponse(false, null, 'MissingParameter'));
				return;
			}

			const user = await UserRepository.findByUsername(username);

			if (!user) {
				res.status(400).send(new ApiResponse(false, null, 'InvalidCredentials'));
				return;
			}

			const isPasswordCorrect = await user.authenticate(password);
			if (!isPasswordCorrect) {
				res.status(400).send(new ApiResponse(false, null, 'InvalidCredentials'));
				return;
			}

			req.session.authToken = user.getToken();
			res.status(200).send(new ApiResponse(true, null, null));

		} catch (error) {
			res.status(500).send(new ApiResponse(false, null, 'InternalError'));
		}
	}

	static logout = (req: Request, res: Response): void => {
		res.status(200).clearCookie('session');
		req.session.destroy(() => {
			res.send(new ApiResponse(true, null, null));
		});
		return;
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
			const users = await UserRepository.findAllPublic();
			res.status(200).send(new ApiResponse(true, users, null));
		} catch (error) {
			res.status(500).send(new ApiResponse(false, null, 'InternalError'));
		}
	}

	/**
	 * Get a user.
	 * 
	 * Search a username and send public information about the user found.
	 * 
	 * @param {Request}  req the HTTP request
	 * @param {Response} res the HTTP response
	 */
	static getUser = async (req: Request, res: Response): Promise<void> => {
		try {
			const { username } = req.params;
			const user = await UserRepository.findByUsernamePublic(username);

			if (!user) {
				res.status(204).send(new ApiResponse(true, null, 'NoData'));
				return;
			}

			res.status(200).send(new ApiResponse(true, user, null));

		} catch (error) {
			res.status(500).send(new ApiResponse(false, null, 'InternalError'));
		}
	}

	/**
	 * Get a user.
	 * 
	 * Search a username and send all information about the user found.
	 * 
	 * @param {Request}  req the HTTP request
	 * @param {Response} res the HTTP response
	 */
	static getPrivateUser = async (req: Request, res: Response): Promise<void> => {
		try {
			const { username } = req.params;
			const { username: tokenUsername } = res.locals.user;

			if (username !== tokenUsername) {
				res.status(403).send(new ApiResponse(false, null, 'Forbidden'));
				return;
			}

			const user = await UserRepository.findByUsernamePrivate(username);

			if (!user) {
				res.status(204).send(new ApiResponse(true, null, 'NoData'));
				return;
			}

			res.status(200).send(new ApiResponse(true, user, null));


		} catch (error) {
			res.status(500).send(new ApiResponse(false, null, 'InternalError'));
		}
	}

	/**
	 * Update the user, based on the username.
	 * 
	 * Check if credentials are valid.
	 * If a new username and/or a new email are provided, format them and check if they are already in use.
	 * Hash the password
	 * Finally, save the updated user instance.
	 * 
	 * @param {Request}  req the HTTP request
	 * @param {Response} res the HTTP response
	 */
	static updateUser = async (req: Request, res: Response): Promise<void> => {
		try {

			const { username: tokenUsername } = res.locals.user;
			const { username: currUsername } = req.params;
			const { 
				password: currPassword, 
				username: reqUsername, 
				email: reqEmail, 
			} = req.body;

			if (!currUsername || !currPassword || currUsername !== tokenUsername) {
				res.status(400).send(new ApiResponse(false, null, 'MissingParameter'));
				return;
			}

			const user = await UserRepository.findByUsername(currUsername);

			if (!user) {
				res.status(400).send(new ApiResponse(false, null, 'InvalidCredentials'));
				return;
			}

			const isPasswordCorrect = await user.authenticate(currPassword);

			if (!isPasswordCorrect) {
				res.status(400).send(new ApiResponse(false, null, 'InvalidCredentials'));
				return;
			}

			if (reqUsername) {
				const newUsername = this.formatUsername(reqUsername);
				if (newUsername !== user.username && await this.isExistingUsername(newUsername)) {
					res.status(409).send(new ApiResponse(false, null, 'UsernameAlreadyInUse'));
					return;
				}
				user.username = newUsername;
			}

			if (reqEmail) {
				const newEmail = this.formatEmail(reqEmail);
				if (newEmail !== user.email && await this.isExistingEmail(newEmail)) {
					res.status(409).send(new ApiResponse(false, null, 'EmailAlreadyInUse'));
					return;
				}
				user.email = newEmail;
			}

			await user.save();

			req.session.authToken = user.getToken();
			res.status(200).send(new ApiResponse(true, null, null));
			
		} catch (error) {
			res.status(500).send(new ApiResponse(false, null, 'InternalError'));
		}
	}

	/**
	 * Delete a user instance.
	 * 
	 * Search a user instance based on the username.
	 * Check if credentials are valid, then delete the user instance.
	 * 
	 * @param {Request}  req the HTTP request
	 * @param {Response} res the HTTP response
	 */
	static deleteUser = async (req: Request, res: Response): Promise<void> => {
		try {
			const { username: tokenUsername } = res.locals.user;
			const { username } = req.params;
			const { password } = req.body;

			if (!username || !password || username !== tokenUsername) {
				res.status(400).send(new ApiResponse(false, null, 'MissingParameter'));
				return;
			}

			const user = await UserRepository.findByUsername(username);

			if (!user) {
				res.status(400).send(new ApiResponse(false, null, 'InvalidCredentials'));
				return;
			}

			const isPasswordCorrect = await user.authenticate(password);

			if (!isPasswordCorrect) {
				res.status(400).send(new ApiResponse(false, null, 'InvalidCredentials'));
				return;
			}

			await user.destroy();

			res.status(200).send(new ApiResponse(true, null, null));

		} catch (error) {
			res.status(500).send(new ApiResponse(false, null, 'InternalError'));
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