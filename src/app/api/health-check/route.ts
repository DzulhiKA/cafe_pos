import { checkDatabaseConnection } from "@/lib/sequelize";
import { NextResponse } from "next/server";

export function GET() {
    checkDatabaseConnection();

    return NextResponse.json({
        status: "ok",
        message: "Health check passed",
        timestamp: new Date().toISOString(),
    });
}