const jwt = require('jsonwebtoken');

const db = require('../controllers/db');

const verifyToken = async (req, res, next) => {
    const path = req.path;
    const token = req.headers?.authorization?.split(' ') ?? [];

    if (['/auth/login', '/auth/register'].includes(path)) {
        return next();
    }

    if (!token[1]) {
        return res.status(403).send({
            message: 'Peticion no autorizada',
            authorizaton: false
        });
    }

    jwt.verify(token[1], 'carnet-19004628', async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                err,
                message: 'Peticion no autorizada',
                authorizaton: false
            });
        }

        if (!decoded.idusuario) {
            return res.status(401).send({
                err,
                message: 'Peticion no autorizada',
                authorizaton: false
            });
        }

        const query = 'SELECT * FROM usuario WHERE idusuario = ?;';
        const result = await db.awaitQuery(query, [decoded.idusuario]);
        const usuario = result[0];

        req.body.idusuario = usuario.idusuario;
        req.body.auth = usuario;

        next();
    });
}

module.exports = verifyToken;