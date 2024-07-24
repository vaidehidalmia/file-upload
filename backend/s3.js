require('dotenv').config()
const S3 = require("aws-sdk/clients/s3")

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

async function getFilesList() {
    const params = {
        Bucket: bucketName,
        MaxKeys: 10
    }
    const list = s3.listObjects(params).promise();
    return list || {}
}

async function downloadFile(fileKey) {
    const params = {
        Key: fileKey,
        Bucket: bucketName
    }
    const { Body } = await s3.getObject(params).promise();
    return Body
}

module.exports = {
    getFilesList,
    downloadFile
}