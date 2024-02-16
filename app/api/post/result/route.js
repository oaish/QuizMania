import {NextResponse} from "next/server";
import Result from "@/models/Result";

export const dynamic = 'force-dynamic'

export async function POST(req) {
    try {
        const {type, sub, marks, timeTaken, attempted, correct, percentage, username} = await req.json();
        let res = await Result.create({type, sub, marks, timeTaken, attempted, correct, percentage, username});
        return NextResponse.json({ success: true, res });
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: 'Internal Server Error: ' + error.message, status: 500 });
    }
}

