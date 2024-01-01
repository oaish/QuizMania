import {NextResponse} from "next/server";
import executeQuery from "@/app/lib/db";

export const dynamic = 'force-dynamic'

export async function POST(req) {
    try {
        const {type, sub, marks, timeTaken, attempted, correct, percentage, username} = await req.json();
        let res = await executeQuery(`INSERT INTO quiz_history (type, sub, marks, timeTaken, attempted, correct, percentage, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [type, sub, marks, timeTaken, attempted, correct, percentage, username]);
        return NextResponse.json({ success: true, res });
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: 'Internal Server Error: ' + error.message, status: 500 });
    }
}

