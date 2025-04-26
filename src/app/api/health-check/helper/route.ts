import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const reqBody = await req.json();
    let hashedPass = null;
    if (reqBody.password) {
        hashedPass = await hash(reqBody.password, 10);
    }

    return NextResponse.json({
        status: "ok",
        message: "Helper Health Check OK",
        hashedPass: hashedPass,
    });
}