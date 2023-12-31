import executeQuery from "@/app/lib/db";
import {NextResponse} from "next/server";

export async function POST(req) {
    try {
        const {username, password} = await req.json();
        await executeQuery(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password]);
        return NextResponse.json({success: true});
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: 'Internal Server Error: ' + error.message, status: 500 });
    }
}