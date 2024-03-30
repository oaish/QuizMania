import {NextResponse} from "next/server";
import User from "@/models/User";
import connect from "@/app/lib/db";

export async function POST(req) {
    try {
        await connect()
        const {email, password} = await req.json();
        let user = await User.find().where({email, password});
        if (user.length === 0) {
            return NextResponse.json({error: 'Invalid Credentials', status: 401});
        }
        console.log(user[0])
        return NextResponse.json({success: true, token: user[0]._id, user});
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({error: 'Internal Server Error: ' + error.message, status: 500});
    }
}

//http://localhost:3000/api/get/all-questions?table=ETI&limit=20