import { Pool } from 'pg';

const pool = new Pool({
  user: 'devuser',
  host: 'localhost',
  database: 'devdb',
  password: 'devpassword',
  port: 5432,
});

export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release();
  }
};
