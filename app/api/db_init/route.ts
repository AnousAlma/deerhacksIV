import initializeDatabase from '@/lib/db/init';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        await initializeDatabase();
        return NextResponse.json({ message: 'Successfully initialized database' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error initializing database' }, { status: 500 });
    }
}