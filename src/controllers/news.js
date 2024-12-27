const { createContent, getAlldata, getDataById, deleteDataById, getLatestdata, getTopdata, getInternationaldata } = require("../services/news");


async function addInfo(req, res){

    try{
        const files = req.files;
        const data = req.body;
        const response = await createContent(data, files);
        return res.status(201).json({
            success: true,
            message: 'Successfully created the news',
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

async function findLatestData(req, res){

    try{
        
        const response = await getLatestdata();

        return res.status(201).json({
            success: true,
            message: 'Successfully fetch all data',
            data : response.reverse(),
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

async function findTopData(req, res){

    try{
        
        const response = await getTopdata();
        return res.status(201).json({
            success: true,
            message: 'Successfully fetch all data',
            data : response.reverse(),
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

async function findInternationalData(req, res){

    try{
        
        const response = await getInternationaldata();
        return res.status(201).json({
            success: true,
            message: 'Successfully fetch all data',
            data : response.reverse(),
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
        const id = req.params.id;
        const response = await getDataById(id);
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
    findLatestData,
    findTopData,
    findInternationalData,
    findById,
    findAndDeleteById
}