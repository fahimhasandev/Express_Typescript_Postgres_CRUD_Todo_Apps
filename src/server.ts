import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const app = express();
const PORT = 3001;

// Parser -json data
app.use(express.json());
// parse form data --> app.use(express.urlencoded());

//DB
const pool = new Pool({
	connectionString: `${process.env.POSTGRESS_CONNECTION_STRING}`,
});

const initDB = async () => {
	await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    age INT,
    phone VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW())`);

	await pool.query(`
    CREATE TABLE IF NOT EXISTS todos(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false,
    due_date DATE, 
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `);
};

initDB();

//Home route
app.get('/', (req: Request, res: Response) => {
	res.send('Hello Next world');
});

app.post('/users', async (req: Request, res: Response) => {
	const { name, email } = req.body;

	// Query will be successful and fail --so add try_catch
	try {
		// first write query
		// Value()  is not sql injection proof ---so we need to send as parametized
		const result = await pool.query(`INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`, [name, email]);
		// console.log(result.rows[0]);

		res.status(201).json({
			success: false,
			message: 'Data Inserted Successfully',
			data: result.rows[0],
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error?.message,
		});
	}

	console.log(req.body);
	res.status(201).json({
		success: true,
		message: 'API is working',
	});
});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});
