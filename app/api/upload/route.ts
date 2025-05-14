import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';

// Define MongoDB Schema
const uploadSchema = new mongoose.Schema({
  //zipFile: Buffer,
  partialFile: Buffer,
  createdAt: { type: Date, default: Date.now },
}, {
  collection: 'fingerprints'    // ← forces use of the existing `fingerprints` collection
});


const Upload = mongoose.models.Upload || mongoose.model('Upload', uploadSchema);


export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  const mongoUri = "mongodb+srv://admin:admin123@cluster0.do482.mongodb.net/Reconstructify";
  if (!mongoUri) {
    return NextResponse.json(
      { error: 'Database connection not configured' },
      { status: 500 }
    );
  }

  await mongoose.connect(mongoUri);

  try {
    const formData = await request.formData();
    const zipFile = formData.get('zip') as File;
    const partialFile = formData.get('partial') as File;

    if (!zipFile || !partialFile) {
      return NextResponse.json(
        { error: 'Missing required files' },
        { status: 400 }
      );
    }

    // Convert Files to Buffers
    const zipBuffer = Buffer.from(await zipFile.arrayBuffer());
    const partialBuffer = Buffer.from(await partialFile.arrayBuffer());

    // Save to MongoDB
    const upload = new Upload({
      zipFile: zipBuffer,
      partialFile: partialBuffer
    });

    await upload.save();

    return NextResponse.json({ 
      id: upload._id,
      message: 'Files uploaded successfully' 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await mongoose.disconnect();
  }
}