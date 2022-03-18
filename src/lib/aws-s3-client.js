import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'

const REGION = 'us-east-1'

const credentials = {
  accessKeyId: 'AKIAVN2UZNQN3LQXONUJ',
  secretAccessKey: '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',
};
export const s3Client = new S3Client({
  region: REGION,
  credentials
})

export const getObjectFromS3 = async (bucketName = 'kshack', key = '') => {

  if (!bucketName || !key) {
    return
  }

  const params = {
    Bucket: 'kshack',
    Key: 'sleep.wav',
  }


  try {
    const streamToString = (stream) => 
      new Promise((resolve, reject) => {
        const chunks = []
        stream.on('data', (chunk) => chunks.push(chunk))
        stream.on('error', reject)
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')))
      })

    const data = await s3Client.send(new GetObjectCommand(params))

    const bodyContents = await streamToString(data.Body)
    return bodyContents
  } catch (error) {
    console.log('Error grabbing file', error)
  }
}