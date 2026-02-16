//type declaring file

import { JwtPayload } from 'jsonwebtoken';

//
declare global {
	// which interace will change
	namespace Express {
		interface Request {
			user?: JwtPayload;
		}
	}
}
