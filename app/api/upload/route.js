import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
// import connectDb from '@/lib/mongoDB';
// import ImageModel from '@/Models/ImageModel';

// Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

// Helper function to convert stream to buffer
// async function streamToBuffer(stream) {
//   const chunks = [];
//   for await (const chunk of stream) {
//     chunks.push(Buffer.from(chunk));
//   }
//   return Buffer.concat(chunks);
// }

// export async function POST(req) {
//   try {
//     await connectDb(); // Connect to MongoDB

//     const formData = await req.formData();
//     const file = formData.get('image'); // Get the image file

//     // Convert the stream to a buffer
//     const buffer = await streamToBuffer(file.stream());

//     // Upload the buffer to Cloudinary
//     const uploadResult = await cloudinary.uploader.upload_stream({ folder: 'uploads' }, (err, result) => {
//       if (err) throw new Error('Failed to upload image');
//       return result;
//     }).end(buffer);

//     // Save the image URL in MongoDB
//     const savedImage = await ImageModel.create({ url: uploadResult.secure_url });

//     return new Response(JSON.stringify({ message: 'Image uploaded', image: savedImage }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

export async function POST(req) {
  const body = (await req.json());
  const { paramsToSign } = body;
  const signature = cloudinary.utils.api_sign_request(body.paramsToSign, process.env.CLOUDINARY_API_SECRET);
  return Response.json({
    msg:"image uploaded",
    result:"ok",
    signature,
  })
}




