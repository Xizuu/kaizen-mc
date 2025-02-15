import {NextRequest, NextResponse} from "next/server";

const TRIPAY_API_KEY = process.env.TRIPAY_API_KEY;

export async function POST(request: NextRequest) {
    try {
        const { id } = await request.json();

        const url = `https://tripay.co.id/api-sandbox/transaction/detail?reference=${id}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TRIPAY_API_KEY}`,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            return NextResponse.json({
                status: 400,
                message: "Failed to fetch transaction status."
            })
        }

        const result = await response.json();

        return NextResponse.json({
            status: 200,
            message: "Fetch transaction success",
            data: result.data
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({
                status: 500,
                message: error.message || "An error occurred"
            })
        } else {
            return NextResponse.json({
                status: 500,
                message: "An unknown error occurred"
            })
        }
    }
}