import {NextResponse} from "next/server";
import executeQuery from "@/app/lib/db";

export const dynamic = 'force-dynamic'

export async function GET(req) {
    try {
        const {searchParams} = await req.nextUrl;
        const limit = searchParams.get('limit');
        const table = searchParams.get('table');
        let questions
        if (limit)
            questions= await executeQuery(`SELECT * FROM ${table} LIMIT ?`, [limit])
        else
            questions = await executeQuery(`SELECT * FROM ${table}`)
        return NextResponse.json(questions);
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: 'Internal Server Error: ' + error.message, status: 500 });
    }
}

//http://localhost:3000/api/get/all-questions?table=eti_questions&limit=20