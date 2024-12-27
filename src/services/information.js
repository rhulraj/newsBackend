const { createInfo, fetchAllInfo, fetchDataById, deleteById } = require("../repositories/information");
const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs/promises')
const InternalServerError = require("../utils/internalServerError");
const notFoundError = require("../utils/notFoundError");


async function createContent(data, files){

    try{
        const images = files;
        const cloudinaryFunc = async(image)=>{
            return await cloudinary.uploader.upload(image);
        }
        if(images){
        for(const element of images) {
            const {path} = element;
            const image = await cloudinaryFunc(path)
            data[`image${images.indexOf(element) +1 }`] = image.secure_url;
                await fs.unlink(process.cwd() + "/" + path);

        };
       }
        const response =await createInfo(data);

        
            
        
        return response;
    }catch(error){
        throw new InternalServerError();
    }
}

async function getAlldata(){
    try{
        
       const response = await fetchAllInfo();
        if(!response){
            throw new notFoundError()
        }
       return response
    }catch(error){
        console.log(error)
    }
}

async function getDataById(id){
      try{
        
          const response = await fetchDataById(id)
        
        if(!response){
            throw new notFoundError()
        }
         return response;
      }catch(error){
         console.log(error);
      }
}

async function deleteDataById(id){
        try{
            
            const response = await deleteById(id);
            if(!response){
                throw new notFoundError()
            }
            return response;
        }catch(error){
           console.log(error)
        }  
}

module.exports = {
    createContent,
    getAlldata,
    getDataById,
    deleteDataById
}