const AWS = require('aws-sdk');
const fs = require('fs');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1'
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET;

class S3Service {
  // Subir archivo a S3
  uploadFile = async (file) => {
    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: file.filename,
        Body: file.buffer,
        ContentType: file.mimetype
      };

      const result = await s3.upload(params).promise();

      console.log(`📤 Archivo subido a S3: ${file.filename}`);
      return result.Location; // URL pública
    } catch (error) {
      console.error('Error al subir a S3:', error);
      throw error;
    }
  };

  // Eliminar archivo de S3
  deleteFile = async (filename) => {
    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: filename
      };

      await s3.deleteObject(params).promise();
      console.log(`🗑️ Archivo eliminado de S3: ${filename}`);
    } catch (error) {
      console.error('Error al eliminar de S3:', error);
      throw error;
    }
  };

  // Verificar si archivo existe
  fileExists = async (filename) => {
    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: filename
      };

      await s3.headObject(params).promise();
      return true;
    } catch (error) {
      if (error.code === 'NotFound') {
        return false;
      }
      throw error;
    }
  };
}

module.exports = new S3Service();
