const jwt = require("jsonwebtoken")

const SECRET = "secreto_super_seguro"

const verificarToken = (req, res, next) => {

    const header = req.headers["authorization"]

    if (!header) {
        return res.status(403).send("Token requerido")
    }

    const token = header.split(" ")[1]

    try {
        const decoded = jwt.verify(token, SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).send("Token inválido")
    }
}

module.exports = verificarToken