import {NextResponse} from "next/server";
import executeQuery from "@/app/lib/db";

export const dynamic = 'force-dynamic'

export async function GET(req) {
    try {
        const {searchParams} = await req.nextUrl;
        const ut = searchParams.get('ut');
        const table = searchParams.get('table');

        let units = [];

        if (ut === "1") {
            units = ["I","II","III"]
        } else {
            units = ["IV","V","VI"]
        }

        const questions = await executeQuery(`SELECT * FROM ${table} WHERE unit IN(?,?,?)`, [...units])
        return NextResponse.json(questions);
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: 'Internal Server Error: ' + error.message, status: 500 });
    }
}
