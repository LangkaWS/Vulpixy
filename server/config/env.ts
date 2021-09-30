import dotenv from 'dotenv';

const getVars = (): dotenv.DotenvParseOutput => {
	const dotenvConfig = dotenv.config({ path: `${__dirname}/.env`});
	if (dotenvConfig.error) {
		throw dotenvConfig.error;
	}

	const envVars = dotenvConfig.parsed;
	if (!envVars) {
		throw new Error('No environment variables defined. Process terminated.');
	}

	return envVars;
};

const verifyVars = (props: Array<string>, vars: dotenv.DotenvParseOutput): boolean => {
	return props.every(prop => prop in vars);
};

export default () => {
	try {
		const envVars = getVars();
		const reqProps = ['SECRET', 'DB_DIALECT', 'DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
    
		if (verifyVars(reqProps, envVars)) {
			return envVars;
		} else {
			throw new Error('Missing environment variables. Process terminated.');
		}
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};