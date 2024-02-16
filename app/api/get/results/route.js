import {NextResponse} from "next/server";
import executeQuery from "@/app/lib/db";
import Result from "@/models/Result";

export const dynamic = 'force-dynamic'

export async function GET(req) {
    try {
        const {searchParams} = await req.nextUrl;
        const username = searchParams.get('username');
        await Result.deleteMany({username: username, createdAt: {$lt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)}})
        let results = await Result.find({username: username});
        return NextResponse.json(results);
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: 'Internal Server Error: ' + error.message, status: 500 });
    }
}

