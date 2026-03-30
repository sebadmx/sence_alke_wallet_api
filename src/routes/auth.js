const express = require("express")
const router = express.Router()
const pool = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const SECRET = "secreto_super_seguro"

// REGISTRO
router.post("/register", async (req, res) => {
    try {
        const { nombre, correo, password } = req.body

        const hash = await bcrypt.hash(password, 10)

        const result = await pool.query(
            "INSERT INTO usuario (nombre, correo_electronico, password) VALUES ($1,$2,$3) RETURNING *",
            [nombre, correo, hash]
        )

        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json(error)
    }
})

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { correo, password } = req.body

        const result = await pool.query(
            "SELECT * FROM usuario WHERE correo_electronico = $1",
            [correo]
        )

        if (result.rows.length === 0) {
            return res.status(400).send("Usuario no existe")
        }

        const user = result.rows[0]

        const valid = await bcrypt.compare(password, user.password)

        if (!valid) {
            return res.status(401).send("Contraseña incorrecta")
        }

        const token = jwt.sign(
            { id: user.user_id },
            SECRET,
            { expiresIn: "1h" }
        )

        res.json({ token })

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router