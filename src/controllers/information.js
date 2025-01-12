const { createContent, getAlldata, getDataById, deleteDataById } = require("../services/information");


async function addInfo(req, res){

    try{

        const files = req.files;
        let data = req.body;
        const url = data.url.replace(" ","-")
        data = {...data, url:url}
        const response = await createContent(data, files);
        
        return res.status(201).json({
            success: true,
            message: 'Successfully created the information',
            data : response,
            error: {}
        });
    }catch(error){
        return res.status(201).json({
            success: false,
            message: error.message,
            data : {},
            error: error
        });

    }
}

async function findAllData(req, res){

    try{
        
        const response = await getAlldata();
        return res.status(201).json({
            success: true,
            message: 'Successfully fetch all data',
            data : response,
            error: {}
        });
    }catch(error){
        return res.status(201).json({
            success: false,
            message: error.message,
            data : {},
            error: error
        });

    }
}

async function findById(req, res){

    try{
        const url = req.params.url;
        const response = await getDataById(url);
        return res.status(201).json({
            success: true,
            message: 'Successfully fetch the information',
            data : response,
            error: {}
        });
    }catch(error){
        return res.status(201).json({
            success: false,
            message: error.message,
            data : {},
            error: error
        });

    }
}

async function findAndDeleteById(req, res){

    try{
        const id = req.params.id;
        const response = await deleteDataById(id);
        return res.status(201).json({
            success: true,
            message: 'Successfully deleted the information',
            data : response,
            error: {}
        });
    }catch(error){
        return res.status(201).json({
            success: false,
            message: error.message,
            data : {},
            error: error
        });

    }
}

module.exports = {
    addInfo,
    findAllData,
    findById,
    findAndDeleteById
}