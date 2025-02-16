import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server'; // Import NextResponse

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Use environment variables
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function POST(req: Request) {  // Use POST and req: Request
    // authorize using api key or session (optional, add if needed)
    // const apiKey = req.headers.get("x-api-key");

    // if (apiKey !== null && apiKey !== process.env.API_KEY) {
    //     return NextResponse.json({ error: "Unauthorized: Invalid API key" }, { status: 401 });
    // }
    // else if (apiKey === null) {
    //     //If you need session based authorization, implement it here.  For example:
    //     // const session = await getServerSession(authOptions);
    //     // if (!session) {
    //     //     return NextResponse.json({ error: "Unauthorized: No session or API key" }, { status: 401 });
    //     // }
    // }


    try {
        const { file } = await req.json(); // Use req.json() to parse the body

        if (!file) {
            return NextResponse.json({ message: 'No file provided' }, { status: 400 });
        }

        const result = await cloudinary.uploader.upload(file, {
            upload_preset: 'ml_default', // Or your preset
        });

        return NextResponse.json({ url: result.secure_url }, { status: 200 }); // Return with NextResponse
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return NextResponse.json({ message: 'Error uploading file', error: error }, { status: 500 }); // Include error details if needed
    }
}