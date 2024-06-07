const db = require('./db');
const helpers = require('../helpers');

const index = async (req, res) => {
    let response = {};

    try {
        const { idusuario } = req.body;
        const query = 'SELECT * FROM tarea WHERE idusuario = ? AND activa = true ORDER BY 1 ASC;';
        const data = await db.awaitQuery(query, [idusuario]);

        response.data = data;
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

const store = async (req, res) => {
    let response = {};

    try {
        const { titulo, descripcion, prioridad, idusuario } = req.body;
        const query = 'INSERT INTO tarea(titulo, descripcion, prioridad, idusuario) values(?, ?, ?, ?);';
        const query2 = 'SELECT * FROM tarea WHERE idusuario = ? AND activa = true ORDER BY 1 ASC;';

        await db.awaitQuery(query, [titulo, descripcion, prioridad, idusuario]);
        const data = await db.awaitQuery(query2, [idusuario]);

        response.data = data;
        response.message = 'Tarea guardada';
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

const finish = async (req, res) => {
    let response = {};

    try {
        const { id } = req.params;
        const { idusuario } = req.body;
        const query = 'UPDATE tarea SET activa = false WHERE idtarea = ?;';
        const query2 = 'SELECT * FROM tarea WHERE idusuario = ? AND activa = true ORDER BY 1 ASC;';

        await db.awaitQuery(query, [id]);
        const data = await db.awaitQuery(query2, [idusuario]);

        response.data = data;
        response.message = 'Tarea finalizada';
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

const search = async (req, res) => {
    let response = {};

    try {
        const { idusuario } = req.body;
        const { titulo, ordenar, prioridad } = req.query;
        const tituloWhere = `%${titulo}%`;

        let where = 'WHERE idusuario = ? AND activa = true AND titulo LIKE ?';
        if (prioridad === '0') {
            where += ` AND ${prioridad} = ?`;
        } else {
            where += ' AND prioridad = ?';
        }

        let order = 'ORDER BY 1 ASC';
        if (ordenar == 'Z-A') {
            order = 'ORDER BY 1 DESC';
        }

        const query = `SELECT * FROM tarea ${where} ${order}`;
        console.log(query);
        const data = await db.awaitQuery(query, [idusuario, tituloWhere, prioridad]);

        response.data = data;
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

module.exports = {
    index,
    store,
    finish,
    search
}