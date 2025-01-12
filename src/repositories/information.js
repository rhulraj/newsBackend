const information = require('../schema/information');
const BadRequestError = require('../utils/badRequest');
const InternalServerError = require('../utils/internalServerError');

async function createInfo(data){
    try{
        console.log(data)
    const createInfo = await information.create(data);
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
async function fetchAllInfo(){
     try{
        const response = await information.find({});
        return response
     }catch(error){
        throw new InternalServerError()
    }
}
async function fetchDataByUrl(url){
    try{
        
        const response = await information.findOne({url});
        return response;
    }catch(error){
        console.log(error)
        throw new InternalServerError();
    }
}
async function deleteById(id){
    try{
        const response = await information.findByIdAndDelete(id);
        return response;
    }catch(error){
        throw new InternalServerError();
    }
}
module.exports = {
    createInfo,
    fetchAllInfo,
    fetchDataByUrl,
    deleteById
}