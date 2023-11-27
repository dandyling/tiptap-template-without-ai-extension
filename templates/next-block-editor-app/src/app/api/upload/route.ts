import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'
import { customAlphabet } from 'nanoid'
// import { File } from 'buffer'

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  region: process.env.S3_REGION,
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: true,
})

const getNanoId = (): string => {
  const nanoid = customAlphabet('6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz', 10)

  return nanoid()
}

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get('file')
    const filename = form.get('filename') || ''
    const newFilename = `demo-pitch-${getNanoId()}-${filename.replace(/ /g, '')}`
    const url = `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET_NAME}/${encodeURIComponent(newFilename)}`

    if (!file) {
      return NextResponse.json({ message: 'failure' })
    }

    // const isFile = file instanceof File

    // if (!isFile) return NextResponse.json({ message: 'failure' })
    // console.log('if (!isFile) ')

    const buffer = await file.arrayBuffer()

    const putCommand = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: newFilename,
      Body: Buffer.from(buffer),
    })

    await s3Client.send(putCommand)

    return NextResponse.json({
      message: 'success',
      url,
    })
  } catch (reason) {
    console.log(reason)

    return NextResponse.json({ message: 'failure' })
  }
}
