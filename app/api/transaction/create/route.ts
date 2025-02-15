import crypto from "crypto";
import {NextRequest, NextResponse} from "next/server";
import {generateId} from "@/lib/utils";
import pool from "@/lib/mysql";

const TRIPAY_API_KEY = process.env.TRIPAY_API_KEY;
const TRIPAY_PRIVATE_KEY = process.env.TRIPAY_PRIVATE_KEY;
const TRIPAY_MERCHANT_CODE = process.env.TRIPAY_MERCHANT_CODE;

export async function POST(request: NextRequest) {
    const db = await pool.getConnection();
    try {
        const { productId, username, method, price } = await request.json();

        if (!productId || !username || !method || !price) {
            return NextResponse.json({
                status: 400,
                message: "Invalid request data. Please provide productId, username, method and price."
            })
        }

        const MERCHANT_REF = generateId().toString();
        const signature = crypto
            .createHmac('sha256', TRIPAY_PRIVATE_KEY)
            .update(TRIPAY_MERCHANT_CODE + MERCHANT_REF + price)
            .digest('hex')

        const expired = parseInt(String(Math.floor(new Date() / 1000) + (20 * 60)))

        const parameter = {
            method: method,
            merchant_ref: MERCHANT_REF,
            amount: price,
            customer_name: username,
            customer_email: `${username}@kaizenmc.id`,
            order_items: [{
                name: productId,
                price: price,
                quantity: 1
            }],
            expired_time: expired,
            signature: signature
        }

        console.log(parameter)

        const response = await fetch('https://tripay.co.id/api-sandbox/transaction/create', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${TRIPAY_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parameter)
        })

        if (!response.ok) {
            return NextResponse.json({
                status: 400,
                message: `Failed to create transaction.`
            })
        }

        const result = await response.json();
        const data = result.data

        console.log(data)

        const insertQuery = `
            INSERT INTO transactions
            (reference, merchant_ref, amount, fee, method, pay_code, qr_url, status, expired_time, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `

        await db.execute(insertQuery, [
            data.reference,
            data.merchant_ref,
            data.amount,
            data.total_fee,
            data.payment_method,
            data.pay_code ?? null,
            data.qr_url ?? null,
            data.status,
            data.expired_time
        ])

        return NextResponse.json({
            status: 201,
            message: "Transaction created",
            data: data
        })
    } catch(error: unknown) {
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
    } finally {
        if (db) db.release()
    }
}