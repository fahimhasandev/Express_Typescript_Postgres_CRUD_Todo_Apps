import express, { NextFunction, Request, Response } from 'express';
import config from './config';
import initDB, { pool } from './config/db';
import logger from './middleware/logger';
import { UserRoutes } from './modules/user/user.routes';
import { TodoRoute } from './modules/todo/todo.routes';
import { authRouters } from './modules/auth/auth.routes';

const app = express();
const port = config.port;
// Parser -json data
app.use(express.json());
// parse form data --> app.use(express.urlencoded());

//initialization DB
initDB();

//Home route
app.get('/', logger, (req: Request, res: Response) => {
	res.send('Hello Next world');
});

//Users CRUD
// app.use('/users', userRoutes)

// rotues -. controller -> service
app.use('/users', UserRoutes);

//* TO DO CRUD
app.use('/todos', TodoRoute);

// auth routes
app.use('/auth', authRouters);

//handle route
app.use((req, res) => {
	res.status(404).json({
		success: false,
		message: 'Route not found',
		path: req.path,
	});
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
