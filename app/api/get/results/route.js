import {NextResponse} from "next/server";
import executeQuery from "@/app/lib/db";

export const dynamic = 'force-dynamic'

export async function GET(req) {
    try {
        const {searchParams} = await req.nextUrl;
        const username = searchParams.get('username');
        await executeQuery(`DELETE FROM quiz_history WHERE username = ? AND createdAt < NOW() - INTERVAL 10 DAY`, [username])
        let results = await executeQuery("SELECT `key`, type, sub, marks, timeTaken, attempted, correct, percentage FROM quiz_history WHERE username = ?", [username])
        return NextResponse.json(results);
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: 'Internal Server Error: ' + error.message, status: 500 });
    }
}

