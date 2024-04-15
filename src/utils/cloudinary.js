import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
    cloud_name: "dv0yscnct", 
    api_key: "261695339612612", 
    api_secret: "r3c4pLGX_9zOJkeJfru8CaB7ohY"
  });

const uploadOnCloudinary = async (localFilePath) => {
    
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
    
}

async function deleteFileByUrl(url) {
    // Extract public_id from the URL
    const publicId = url.match(/\/([^\/]+)\.[a-z]{3,4}(?:$|\?)/i)[1];
  
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      console.log(result);
      console.log("File deleted successfully.");
    } catch (error) {
      console.error("Error deleting file:", error.message);
    }
  }


export {uploadOnCloudinary, deleteFileByUrl};