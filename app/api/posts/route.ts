import { Pool } from 'pg';
import { NextResponse } from 'next/server';
import { exp } from 'firebase/firestore/pipelines';

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

export async function GET() {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at ASC');
    
    return NextResponse.json(result.rows);
}

export async function POST(request: Request) {
    const txt  = (await request.json()).mainText;
    console.log("POST:", txt);
    const result = await pool.query(
        'INSERT INTO posts (main_text) VALUES ($1) RETURNING *',
        [txt]
    );
    return NextResponse.json(result.rows[0]);
}

export async function PUT(request: Request) {
    const { id, mainText } = await request.json();
    console.log("PUT:", id, mainText);
    const result = await pool.query(
        'UPDATE posts SET main_text = $1 WHERE id = $2 RETURNING *',
        [mainText, id]
    );
    return NextResponse.json(result.rows[0]);
}

export async function DELETE(request: Request) {
    const id = await request.json();
    console.log("DELETE:", id);
    const result = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    return NextResponse.json({ message: 'Deleted' });
}
