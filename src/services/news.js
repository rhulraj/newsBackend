const { createInfo,   deleteById, fetchLatestNews, fetchTopNews, fetchInternationalNews, fetchDataByUrl } = require("../repositories/news");
const cloudinary = require('../config/cloudinaryConfig');
const InternalServerError = require("../utils/internalServerError");
const notFoundError = require("../utils/notFoundError");
const fs = require('fs/promises');



async function createContent(data, files){

    try{
       
        if(!data.url){
            return {status :400, message: "url is required"}
        }
        const url = data.url
        
        const findInformation  = await fetchDataByUrl(url)
       
        
        if(findInformation){
            for(const element of images) {
                const {path} = element;
                await fs.unlink(process.cwd() + "/" + path);
       }
       return {status :400, message : "url is already exist" }
    }
        const images = files;
        const cloudinaryFunc = async(image)=>{
            return await cloudinary.uploader.upload(image);
        }
       
        if(images){
        for(const element of images) {
            const {path} = element;
            const image = await cloudinaryFunc(path);
             data[`image${images.indexOf(element) +1 }`] = image.secure_url;
             
             await fs.unlink(process.cwd() + "/" + path);
             
        };
       }
       
        const response = await createInfo(data);
        
        
        return response;
    }catch(error){
        throw new InternalServerError();
    }
}

async function getLatestdata(){
    try{
        
       const response = await fetchLatestNews();
        if(!response){
            throw new notFoundError()
        }
       return response
    }catch(error){
        console.log(error)
    }
}

async function getTopdata(){
    try{
        
       const response = await fetchTopNews();
        if(!response){
            throw new notFoundError()
        }
       return response
    }catch(error){
        console.log(error)
    }
}

async function getInternationaldata(){
    try{
        
       const response = await fetchInternationalNews();
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
        
          const response = await fetchDataByUrl(id)
        
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
    getLatestdata,
    getTopdata,
    getInternationaldata,
    getDataById,
    deleteDataById
}