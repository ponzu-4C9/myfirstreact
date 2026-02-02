import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

export async function GET() {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
}

export async function POST(request: Request) {
    const { mainText } = await request.json();
    const result = await pool.query(
        'INSERT INTO posts (main_text) VALUES ($1) RETURNING *',
        [mainText]
    );
    return NextResponse.json(result.rows[0]);
}