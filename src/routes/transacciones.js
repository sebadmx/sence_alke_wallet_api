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