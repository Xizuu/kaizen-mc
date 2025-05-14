import {NextRequest, NextResponse} from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;

export async function POST(request: NextRequest) {
    try {
        const { id } = await request.json();

        const url = `https://tripay.co.id/api-sandbox/transaction/detail?reference=${id}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            return NextResponse.json({
                status: 400,
                message: "Failed to fetch transaction status."
            }, { status: 400 })
        }

        const result = await response.json();

        return NextResponse.json({
            status: 200,
            message: "Fetch transaction success",
            data: result.data
        }, { status: 200 })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({
                status: 500,
                message: error.message || "An error occurred"
            }, { status: 500 })
        } else {
            return NextResponse.json({
                status: 500,
                message: "An unknown error occurred"
            }, { status: 500 })
        }
    }
}