import {NextResponse} from "next/server";
import User from "@/models/User";
import connect from "@/app/lib/db";

export async function POST(req) {
    try {
        await connect()
        const {username, email, password} = await req.json();
        const user = await User.create({username, email, password});
        console.log(user._id);
        return NextResponse.json({success: true, token: user._id, user});
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({error: 'Internal Server Error: ' + error.message, status: 500});
    }
}

//http://localhost:3000/api/get/all-questions?table=ETI&limit=20