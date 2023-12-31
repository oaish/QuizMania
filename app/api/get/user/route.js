import {NextResponse} from "next/server";
import executeQuery from "@/app/lib/db";

export const dynamic = 'force-dynamic'

export async function GET(req) {
    try {
        const {searchParams} = await req.nextUrl;
        const username = searchParams.get('username');

        const user = await executeQuery(`SELECT username FROM users WHERE username = ?`, [username])
        if (user.length === 1) {
            return NextResponse.json({exists: true});
        } else {
            return NextResponse.json({exists: false});
        }
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: 'Internal Server Error: ' + error.message, status: 500 });
    }
}
