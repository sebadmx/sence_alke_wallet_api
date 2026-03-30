const express = require("express")
const router = express.Router()
const pool = require("../db")

router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM usuario")
        res.json(result.rows)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router

router.get("/vista", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM usuario")
        res.render("usuarios", { usuarios: result.rows })
    } catch (error) {
        res.status(500).send(error)
    }
})