import {NextResponse} from "next/server";
import User from "@/models/User";
import connect from "@/app/lib/db";

export async function POST(req) {
    try {
        await connect()
        const {token} = await req.json();
        let user = await User.find().where({_id: token});
        if (user.length === 0) {
            return NextResponse.json({error: 'Invalid Credentials', status: 401});
        }
        return NextResponse.json({email: user[0].email, username: user[0].username});
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({error: 'Internal Server Error: ' + error.message, status: 500});
    }
}

//http://localhost:3000/api/get/all-questions?table=ETI&limit=20