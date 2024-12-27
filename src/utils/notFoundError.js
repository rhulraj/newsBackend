const AppError = require('./appError')

class notFoundError extends AppError {
    constructor(resourse){
        super(`Not able to find ${resourse}`, 400)
    }
}

module.exports = notFoundError;