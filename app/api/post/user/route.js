import {NextResponse} from "next/server";
import executeQuery from "@/app/lib/db";

export async function POST(req) {
    try {
        const {username, password} = await req.json();
        const user = await executeQuery(`SELECT username FROM users WHERE username = ? AND password = ?`, [username, password]);
        if (user.length === 1) {
            return NextResponse.json({isValid: true});
        } else {
            return NextResponse.json({isValid: false});
        }
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: 'Internal Server Error: ' + error.message, status: 500 });
    }
}
