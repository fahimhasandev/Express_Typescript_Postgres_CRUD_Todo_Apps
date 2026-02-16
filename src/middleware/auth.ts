import jwt, { JwtPayload } from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';
import config from '../config';

const auth = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			// token will be in the header authorization
			const token = req.headers.authorization;

			if (!token) {
				return res.status(500).json({ message: 'You are nto allowed!!' });
			}

			const decoded = jwt.verify(token, config.jwtSecret as string);
			console.log(decoded);

			// why did I set req.user into decodec? --> any can access and compare (jwt email === )
			req.user = decoded as JwtPayload;

			next();
		} catch (error: any) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	};
};

export default auth;
