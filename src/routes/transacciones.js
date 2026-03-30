const express = require("express")
const router = express.Router()
const pool = require("../db")

router.get("/", async (req, res) => {
    try {

        const result = await pool.query(`
        SELECT
        t.transaction_id,
        u1.nombre AS emisor,
        u2.nombre AS receptor,
        m.currency_name,
        t.importe,
        t.transaction_date
        FROM transaccion t
        JOIN usuario u1 ON t.sender_user_id = u1.user_id
        JOIN usuario u2 ON t.receiver_user_id = u2.user_id
        JOIN moneda m ON t.currency_id = m.currency_id
        `)

        res.json(result.rows)

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router

router.get("/vista", async (req, res) => {
    try {
        const result = await pool.query(`
        SELECT
        t.transaction_id,
        u1.nombre AS emisor,
        u2.nombre AS receptor,
        t.importe
        FROM transaccion t
        JOIN usuario u1 ON t.sender_user_id = u1.user_id
        JOIN usuario u2 ON t.receiver_user_id = u2.user_id
        `)

        res.render("transacciones", { transacciones: result.rows })

    } catch (error) {
        res.status(500).send(error)
    }
})



//Proteger transacciones
const verificarToken = require("../middlewares/auth")

router.post("/", verificarToken, async (req, res) => {
    try {

        const { sender, receiver, currency, importe } = req.body

        await pool.query("BEGIN")

        await pool.query(
            "UPDATE usuario SET saldo = saldo - $1 WHERE user_id = $2",
            [importe, sender]
        )

        await pool.query(
            "UPDATE usuario SET saldo = saldo + $1 WHERE user_id = $2",
            [importe, receiver]
        )

        await pool.query(
            "INSERT INTO transaccion (sender_user_id, receiver_user_id, currency_id, importe) VALUES ($1,$2,$3,$4)",
            [sender, receiver, currency, importe]
        )

        await pool.query("COMMIT")

        res.send("Transacción realizada")

    } catch (error) {
        await pool.query("ROLLBACK")
        res.status(500).json(error)
    }
})