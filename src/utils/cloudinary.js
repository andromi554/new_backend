import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import dotenv from "dotenv"
cloudinary.config({
        cloud_name:process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret  
    })


const uploadOnCloudinary = async(localFilePath) =>{
    try{
        if(!localFilePath){
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath,
            {
                resource_type:"auto"
            })

        console.log("file uploaded on cloudinary" + response.url);
        //once the file is uploaded we wuld liek to dedlete it from the server
        fs.unlinkSync(localFilePath);
        return response;
    }
    catch(error){
        console.log("error on cloud: ",error)
        fs.unlinkSync(localFilePath);
        return null;
    }
}

const deleteFromCloudinary =async(publicId) =>{
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("dlerted the file successfully: ",publicId);
    } catch (error) {
        console.log("Error i deleting from cloudinary")
        
    }
}

export {uploadOnCloudinary,deleteFromCloudinary}