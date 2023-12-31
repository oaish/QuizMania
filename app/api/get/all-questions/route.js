import {NextResponse} from "next/server";
import executeQuery from "@/lib/db";

export async function GET(req) {
    try {
        const {searchParams} = await req.nextUrl;
        const limit = searchParams.get('limit');
        const table = searchParams.get('table');
        const questions = await executeQuery(`SELECT * FROM ${table} LIMIT ?`, [limit])
        return NextResponse.json(questions);
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: 'Internal Server Error: ' + error.message, status: 500 });
    }
}
