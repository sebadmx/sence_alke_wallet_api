const express = require("express")
const cors = require("cors")

const usuarios = require("./routes/usuarios")
const monedas = require("./routes/monedas")
const transacciones = require("./routes/transacciones")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/usuarios", usuarios)
app.use("/monedas", monedas)
app.use("/transacciones", transacciones)

app.listen(3000, () => {
    console.log("Servidor corriendos en puerto 3000")
})