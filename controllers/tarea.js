const db = require('./db');
const helpers = require('../helpers');

// const index = async (req, res) => {
//     let response = {};

//     try {
        
//     } catch (e) {
//         response = helpers.failRequest(e, req, res);
//     }

//     res.status(response?.status ?? 200).send(response);
// }

const index = async (req, res) => {
    let response = {};

    try {
        const query = 'SELECT * FROM tarea;';
        const data = await db.awaitQuery(query);

        response.data = data;
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

module.exports = {
    index
}