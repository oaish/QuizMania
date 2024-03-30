import {NextResponse} from "next/server";
import User from "@/models/User";
import connect from "@/app/lib/db";

export async function POST(req) {
    try {
        await connect()
        const {email} = await req.json();
        let user = await User.find().where({email: email});
        if (user.length > 0) {
            return NextResponse.json({error: 'Email already exists', status: 400});
        } else {
            return NextResponse.json({exists: false, status: 200});
        }
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({error: 'Internal Server Error: ' + error.message, status: 500});
    }
}

//http://localhost:3000/api/get/all-questions?table=ETI&limit=20