const jwt = require('jsonwebtoken');

const db = require('./db');
const helpers = require('../helpers');

const login = async (req, res) => {
    let response = {};

    try {
        const { email, clave } = req.body;
        const query = 'SELECT * FROM usuario WHERE email = ?;';
        const result = await db.awaitQuery(query, [email]);
        const usuario = result[0]

        if (usuario) {
            const query2 = 'SELECT md5(?) as hash;';
            const result2 = await db.awaitQuery(query2, [clave]);
            const hash = result2[0]['hash'];

            if (hash === usuario.clave) {
                const token = jwt.sign({ idusuario: usuario.idusuario }, 'carnet-19004628', { expiresIn: '24 hours' });

                response.token = token;
                response.usuario = usuario;
            } else {
                throw new Error('Clave incorrecta');
            }
        } else {
            throw new Error('Usuario no encontrado');
        }
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

const register = async (req, res) => {
    let response = {};

    try {
        const { nombre, email, fecha_nacimiento, clave, genero } = req.body;
        const query = 'SELECT md5(?) as clave;';
        const query2 = 'INSERT INTO usuario(nombre, email, fecha_nacimiento, clave, genero) values(?, ?, ?, ?, ?);';
        const result = await db.awaitQuery(query, [clave]);
        const password = result[0]['clave'];
        await db.awaitQuery(query2, [nombre, email, fecha_nacimiento, password, genero]);

        const query3 = 'SELECT * FROM usuario WHERE email = ?;';
        const result3 = await db.awaitQuery(query3, [email]);
        const usuario = result3[0];

        if (usuario) {
            const token = jwt.sign({ idusuario: usuario.idusuario }, 'carnet-19004628', { expiresIn: '24 hours' });

            response.token = token;
            response.usuario = usuario;
        } else {
            throw new Error('Usuario no encontrado');
        }
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

module.exports = {
    login,
    register
}