import {NextResponse} from "next/server";
import executeQuery from "@/app/lib/db";
import Question from "@/models/Question";

export const dynamic = 'force-dynamic'

export async function GET(req) {
    try {
        const {searchParams} = await req.nextUrl;
        const table = searchParams.get('table');
        let count = await Question.find().where({subject: table}).count();
        return NextResponse.json(count);
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: 'Internal Server Error: ' + error.message, status: 500 });
    }
}

// http://localhost:3000/api/get/table-length?table=ETI