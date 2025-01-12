const news = require('../schema/news')
const BadRequestError = require('../utils/badRequest');
const InternalServerError = require('../utils/internalServerError');

async function createInfo(data){
    try{
    const createInfo = await news.create(data);
    return createInfo;
    }catch(error){
        if(error.name === 'ValidationError'){
            const errorMessagelist = Object.keys(error.errors).map(property =>{
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessagelist);
        }
    }

}
async function fetchLatestNews(){
     try{
        const response = await news.find({"type" : "LATEST"});
        return response
     }catch(error){
        throw new InternalServerError()
    }
}
async function fetchTopNews(){
    try{
        const response = await news.find({"type" : "TOP"})
        return response
    }catch{
        throw new InternalServerError()
    }
}

async function fetchInternationalNews(){
    try{
        const response = await news.find({"type" : "INTERNATIONAL"});
        return response
    }catch{
        throw new InternalServerError()
    }
}

async function fetchDataByUrl(url){
    try{
        
        const response = await news.findOne({url});
        
        return response;
    }catch(error){
        
        throw new InternalServerError();
    }
}
async function deleteById(id){
    try{
        const response = await news.findByIdAndDelete(id);
        return response;
    }catch(error){
        throw new InternalServerError();
    }
}
module.exports = {
    createInfo,
    fetchLatestNews,
    fetchTopNews,
    fetchInternationalNews,
    fetchDataByUrl,
    deleteById
}