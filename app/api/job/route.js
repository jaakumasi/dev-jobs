import { NextRequest, NextResponse } from 'next/server';
import localDB from '.././localdb/data.json';

export const POST = async (req) => {
    const { batchSize } = await req.json();
    const batchElements = localDB.slice(0, batchSize);
    return NextResponse.json({ data: batchElements }, { status: 200 })
}
