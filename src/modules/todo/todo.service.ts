import { pool } from '../../config/db';

// Record<string, unknow> ==> {key: value} --> key is string, value is unknown
export const createTodo = async (payload: Record<string, unknown>) => {
	const { user_id, title } = payload;

	const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`, [user_id, title]);
	return result;
};
export const getTodo = async () => {
	const result = await pool.query(`SELECT *  FROM todos`);
	return result;
};

export const getSingleTodo = async (id: string) => {
	const result = await pool.query(`SELECT * FROM todos WHERE ID = $1`, [id]);
	return result;
};

export const updateTodo = async (title: string, description: string, id: string) => {
	const result = await pool.query(`UPDATE todos SET title=$1, description=$2 WHERE id=$3 RETURNING *`, [
		title,
		description,
		id,
	]);
	return result;
};

export const deleteTodo = async (id: string) => {
	const result = await pool.query(`DELETE FROM todos WHERE id=$1`, [id]);
	return result;
};

export const todoServices = {
	createTodo,
	getTodo,
	getSingleTodo,
	deleteTodo,
	updateTodo,
};
