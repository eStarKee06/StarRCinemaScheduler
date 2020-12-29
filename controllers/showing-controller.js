const { Showing } = require('../models');

const reqBodyValidation = (body) => {
    if(Object.keys(body).length !== 2) 
        throw {message: "number of keys in request body is not 2"};
    if(!("tmdb_id" in body) || !("s3_key" in body)) 
        throw {message: "the required keys are not in body"};
    if(isNaN(parseInt(body.tmdb_id))) 
        throw {message: "the value of tmdb_id can't be converted to a number"};
}

const reqBodyValidationPut = (body) => {
    let tableAttributes = ["tmdb_id", "s3_key"];
    let objectKeys = Object.keys(body);
    if(objectKeys.length > 2) 
        throw {message: "number of keys exceed requirement"};
    
    for(let i = 0; i < objectKeys.length; i++){
        if (!tableAttributes.includes(objectKeys[i])) 
            throw {message: "one of the keys are not recognized"};

        if(objectKeys[i] == "tmdb_id" &&  isNaN(parseInt(body.tmdb_id)))
            throw {message: "number of keys exceed requirement"};
    }
}

const postShowing = async(req, res) => {
    try {
        reqBodyValidation(req.body);
        const showing = await Showing.create(req.body);
        return res.status(201).json({
            showing,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const putShowing = async(req, res) => {
    try {
        reqBodyValidationPut(req.body);
        const showing = await Showing.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        return res.status(201).json({
            showing,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteShowing = async(req, res) => {
    try {
        const showing = await Showing.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(201).json({
            showing,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getShowing = async(req, res) => {
    try {
        const showing = await Showing.findOne({
            where: {
                id: req.params.id
            }
        });
        return res.status(201).json({
            showing,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getAllShowings = async(req, res) => {
    try {
        const showing = await Showing.findAll();
        return res.status(201).json({
            showing,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    postShowing, putShowing, deleteShowing, getShowing, getAllShowings
}