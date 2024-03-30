import {NextResponse} from "next/server";
import User from "@/models/User";
import connect from "@/app/lib/db";
import sendMail from "@/app/lib/sendMail";

export async function POST(req) {
    try {
        const {email, otp} = await req.json();
        await sendMail(email, otp)
        return NextResponse.json({success: true});
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({error: 'Internal Server Error: ' + error.message, status: 500});
    }
}

//http://localhost:3000/api/get/all-questions?table=ETI&limit=20