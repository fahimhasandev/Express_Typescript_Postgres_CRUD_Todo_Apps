import { Request, Response } from 'express';
import { todoServices } from './todo.service';

export const createTodo = async (req: Request, res: Response) => {
	// const { user_id, title } = req.body;
	try {
		const result = await todoServices.createTodo(req.body);

		res.status(201).json({
			success: true,
			message: 'Todo created',
			data: result.rows[0],
		});
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

export const getTodo = async (req: Request, res: Response) => {
	try {
		//database connection
		const result = await todoServices.getTodo();

		res.status(200).json({
			success: true,
			message: 'Todos data retrieve successfully',
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

export const getSingleTodo = async (req: Request, res: Response) => {
	console.log(req.params.id);
	try {
		const result = await todoServices.getSingleTodo(req.params.id! as string);

		if (result.rows.length === 0) {
			res.status(404).json({
				success: false,
				message: 'Todos Not Found',
			});
		} else {
			res.status(200).json({
				success: true,
				message: 'Todos Not Found',
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

export const updateTodo = async (req: Request, res: Response) => {
	// console.log(req.params.id);
	const { title, description } = req.body;
	try {
		const result = await todoServices.updateTodo(title, description, req.params.id! as string);

		console.log(result.rows.length);
		if (result.rows.length === 0) {
			res.status(404).json({
				success: false,
				message: 'Todos Not Found',
			});
		} else {
			res.status(200).json({
				success: true,
				message: 'Todos Updated successfully.',
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

export const deleteTodo = async (req: Request, res: Response) => {
	try {
		const result = await todoServices.deleteTodo(req.params.id! as string);
		if (result.rowCount === 0) {
			res.status(404).json({
				success: false,
				message: 'Todos Not Found',
			});
		} else {
			res.status(200).json({
				success: true,
				message: 'Todos Delete successfully.',
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

export const todoController = {
	createTodo,
	getTodo,
	getSingleTodo,
	updateTodo,
	deleteTodo,
};
