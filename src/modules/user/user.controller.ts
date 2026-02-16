import { Request, Response } from 'express';
import { userServices } from './user.service';

export const createUser = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	// Query will be successful and fail --so add try_catch
	try {
		const result = await userServices.createUser(req.body);

		res.status(201).json({
			success: true,
			message: 'Data Inserted Successfully',
			data: result.rows[0],
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error?.message,
		});
	}
};

export const getUser = async (req: Request, res: Response) => {
	try {
		// database connection
		const result = await userServices.getUser();

		res.status(200).json({
			success: true,
			message: 'Users data retrieve successfully',
			data: result.rows,
		});
	} catch (error: any) {
		res.status(500).json({
			message: error?.message,
			success: false,
			detail: error,
		});
	}
};

export const getSingleUser = async (req: Request, res: Response) => {
	console.log(req.params.id);
	try {
		// database
		const result = await userServices.getSingleUser(req.params.id as string);

		if (result.rows.length === 0) {
			res.status(404).json({
				success: false,
				message: 'User Not Found',
			});
		} else {
			res.status(200).json({
				success: true,
				message: 'User Not Found',
				data: result.rows[0],
			});
		}
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: err?.message,
			detail: err,
		});
	}
};

export const updateUser = async (req: Request, res: Response) => {
	// console.log(req.params.id);
	const { name, email } = req.body;
	try {
		const result = await userServices.updateUser(name, email, req.params.id! as string);

		if (result.rows.length === 0) {
			res.status(404).json({
				success: false,
				message: 'User Not Found',
			});
		} else {
			res.status(200).json({
				success: true,
				message: 'User Updated successfully.',
				data: result.rows[0],
			});
		}
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: err?.message,
			detail: err,
		});
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const result = await userServices.deleteUser(req.params.id as string);

		if (result.rowCount === 0) {
			res.status(404).json({
				success: false,
				message: 'User Not Found',
			});
		} else {
			res.status(200).json({
				success: true,
				message: 'User Delete successfully.',
				data: result.rows,
			});
		}
	} catch (err: any) {
		res.status(400).json({
			success: false,
			message: err?.message,
			details: err,
		});
	}
};

export const userControllers = {
	createUser,
	getUser,
	updateUser,
	getSingleUser,
	deleteUser,
};
