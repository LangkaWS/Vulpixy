import express from 'express';
import env from './config/env';
import { createServer } from 'http';
import database from './database';
import routeConfig from './routes';
import cors from 'cors';
import session from 'express-session';
import { Server, Socket } from 'socket.io';

const envVars = env();

const app = express();
const port = envVars.PORT || 8800;
const corsOptions = {
	origin: envVars.CLIENT_URL,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true
};
const sessionCookieOptions = {
	name: 'session',
	secret: envVars.SECRET,
	secure: false
};

declare module 'express-session' {
	export interface SessionData {
		authToken: string;
	}
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(session(sessionCookieOptions));

const httpServer = createServer(app);
const ioConfig = {
	cors: {
		origin: envVars.CLIENT_URL
	}
};
const io = new Server(httpServer, ioConfig);

const onConnection = (socket: Socket) => {
	console.log(`Hello ${socket.id}`);
};

io.on('connection', onConnection);

httpServer.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});

database();

routeConfig(app);