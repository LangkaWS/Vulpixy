import env from '../config/env';
import { Dialect, Sequelize } from 'sequelize';
import User from './models/user/User';

export default async (): Promise<Sequelize> => {
	const sequelize = initSequelize();
	initModels(sequelize);
	await sequelize.sync({ force: true });
	return sequelize;
};

const initSequelize = (): Sequelize => {
	const envVars = env();
	return new Sequelize(
		envVars.DB_NAME,
		envVars.DB_USER,
		envVars.DB_PASSWORD,
		{
			host: envVars.DB_HOST,
			dialect: envVars.DB_DIALECT as Dialect,
			define: {
				charset: 'utf8mb4',
				collate: 'utf8mb4_bin'
			}
		}
	);
};

const initModels = (sequelize: Sequelize) => {
	const models = [User];
	
	for (const model of models) {
		model.initialize(sequelize);
	}
};