const { Showing } = require('../models');

const reqBodyValidation = (body) => {
    if(Object.keys(body).length !== 1) 
        throw {message: "request body length is not 1"};
    if(!("tmdb_id" in body)) 
        throw {message: "the required key, tmdb_id, is not in body"};
    if(isNaN(parseInt(body.tmdb_id))) 
        throw {message: "the value of tmdb_id can't be converted to a number"};
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
        reqBodyValidation(req.body);
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