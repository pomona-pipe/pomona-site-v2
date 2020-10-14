import S3, { ObjectIdentifierList } from 'aws-sdk/clients/s3'

function createS3(Prefix?: string) {
  return new S3({
    endpoint: 's3.us-east-1.amazonaws.com',
    params: {
      Bucket: 'pomona-dropbox',
      Prefix
    }
  })
}

export async function s3DeleteFiles(filePaths: string[]) {
  const s3 = createS3()
  const deleteObjects: ObjectIdentifierList = filePaths.map((path) => ({
    Key: path
  }))
  const deleteResponse = s3
    .deleteObjects({
      Bucket: s3.config.params!.Bucket,
      Delete: {
        Objects: deleteObjects
      }
    })
    .promise()
    .then((data) => data.Deleted)
  return deleteResponse
}

export async function s3ListFiles() {
  const s3 = createS3()
  const filesResponse = s3
    .listObjectsV2()
    .promise()
    .then((data) => data.Contents!.filter((item) => {
      const isFile = !item.Key!.endsWith('/')
      return isFile
    }))
  return filesResponse
}

export async function s3UploadFile(fileUpload: AWSFileUpload) {
  const { uploadPath, fileBuffer, contentType } = fileUpload
  const s3 = createS3()
  const uploadParams = {
    Bucket: s3.config.params!.Bucket,
    Key: uploadPath,
    Body: fileBuffer,
    ContentType: contentType
  }
  const uploadResponse = s3
    .upload(uploadParams)
    .promise()
    .then((data) => {
      return data
    })
  return uploadResponse
}
