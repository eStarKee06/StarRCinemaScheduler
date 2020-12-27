const { Schedule } = require('../models');

const reqBodyValidation = (body) => {
    let dateRegExp = /[0-9]{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1]) ([0-1][0-9]|2[0-4]):[0-5][0-9]:[0-5][0-9]/g;
    if(Object.keys(body).length !== 3) 
        throw {message: "request body length is not 3"};
    if(!("start_date" in body) || !("end_date" in body) || !("tmdb_id" in body)) 
        throw {message: "the required keys are not all in the body"};
    if(body.start_date.match(dateRegExp) == null || body.end_date.match(dateRegExp) == null|| isNaN(parseInt(body.tmdb_id))) 
        throw {message: "key values not formatted correctly"};
}

const reqBodyValidationPut = (body) => {
    let dateRegExp = /[0-9]{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1]) ([0-1][0-9]|2[0-4]):[0-5][0-9]:[0-5][0-9]/g;
    let tableAttributes = ["start_date", "end_date", "showing_id"];
    let objectKeys = Object.keys(body);
    if(objectKeys.length > 3) 
        throw {message: "number of keys exceed the requirement"};
    for(let i = 0; i < objectKeys.length; i++){
        if (!tableAttributes.includes(objectKeys[i])) 
            throw {message: "one of the keys are not recognized"};

        if((objectKeys[i] == "start_date" || objectKeys[i] == "end_date") && body[objectKeys[i]].match(dateRegExp) == null) 
            throw {message: "date format is incorrect"};

        if(objectKeys[i] == "tmdb_id" &&  isNaN(parseInt(body.tmdb_id)))
            throw {message: "foreign id is not an int"};
    }
}

const postSchedule = async(req, res) => {
    try {
        reqBodyValidation(req.body);
        const schedule = await Schedule.create(req.body);
        return res.status(201).json({
            schedule,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const putSchedule = async(req, res) => {
    try {
        reqBodyValidationPut(req.body);
        const schedule = await Schedule.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        return res.status(201).json({
            schedule,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteSchedule = async(req, res) => {
    try {
        const schedule = await Schedule.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(201).json({
            schedule,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getSchedule = async(req, res) => {
    try {
        const schedule = await Schedule.findOne({
            where: {
                id: req.params.id
            }
        });
        return res.status(201).json({
            schedule,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getAllSchedules = async(req, res) => {
    try {
        const schedule = await Schedule.findAll();
        return res.status(201).json({
            schedule,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    postSchedule, putSchedule, deleteSchedule, getSchedule, getAllSchedules
}