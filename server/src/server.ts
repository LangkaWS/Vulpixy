import express from 'express';
import env from './config/env';
import { createServer } from 'http';
import database from './database';
import routeConfig from './routes';

const envVars = env();

const app = express();
const port = envVars.PORT || 8800;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const httpServer = createServer(app);

httpServer.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});

database();

routeConfig(app);