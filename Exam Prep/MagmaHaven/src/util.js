function parseError(err) {
    if (err instanceof Error)  {
        if (!err.errors) {
            //Generic Error
            err.errors = [err.message];
        } else  {
            //Mongoose validation error
            const error = new Error('Invalid validation error');
            error.errors = Object.fromEntries(Object.values(err.errors).map(e => [e.path, e.message]));

            return error;
        }

    }
    //TODO Parse Mongoose validation
        else if (Array.isArray(err)) { 
            //Express validator Error object
            const error = new Error('Invalid validation error');
            error.errors = Object.fromEntries(err.map(e=> [e.path, e.msg]));

            return error;
        }

    return err;
}

module.exports = { parseError};