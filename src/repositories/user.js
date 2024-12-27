const user = require("../schema/users");
const BadRequestError = require("../utils/badRequest");
const InternalServerError = require("../utils/internalServerError");

async function createUser(data){

    try{
        const response = await user.create(data);
        return response;
    }catch(error){
         if(error.name == "validationError"){
            const errorMessagelist = Object.keys(error.errors).map(property=>{
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessagelist);
         }
    }
}

async function findUser(email){

    try{
        const response = user.findOne({email })
        return response
    }catch{
        throw new InternalServerError()
    }
}

module.exports = {
    createUser,
    findUser
}