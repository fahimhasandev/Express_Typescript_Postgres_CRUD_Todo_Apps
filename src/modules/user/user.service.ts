import { pool } from '../../config/db';
import bcrypt from 'bcryptjs';

const createUser = async (payload: Record<string, unknown>) => {
	// first write query
	// Value()  is not sql injection proof ---so we need to send as parametized

	const { name, email, password } = payload;

	//password hash
	const salt = await bcrypt.genSalt(10);
	// const hashedPass = await bcrypt.hash(password as string, 10);
	const hashedPass = await bcrypt.hash(password as string, salt);

	const result = await pool.query(`INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *`, [
		name,
		email,
		hashedPass,
	]);
	// console.log(result.rows[0]);
	return result;
};

const getUser = async () => {
	const result = await pool.query(`SELECT *  FROM users`);
	return result;
};

const getSingleUser = async (id: string) => {
	const result = await pool.query(`SELECT * FROM users WHERE ID = $1`, [id]);

	return result;
};

const updateUser = async (name: string, email: string, id: string) => {
	const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`, [name, email, id]);

	return result;
};

const deleteUser = async (id: string) => {
	const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
	return result;
};

export const userServices = {
	createUser,
	getUser,
	getSingleUser,
	updateUser,
	deleteUser,
};
