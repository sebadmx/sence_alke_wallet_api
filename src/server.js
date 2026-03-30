const express = require("express")
const cors = require("cors")
const hbs = require("hbs")

const usuarios = require("./routes/usuarios")
const monedas = require("./routes/monedas")
const transacciones = require("./routes/transacciones")

const app = express()

app.use(cors())
app.use(express.json())

// 🔥 CONFIG HBS
app.set("view engine", "hbs")
app.set("views", "./src/views")

app.use("/usuarios", usuarios)
app.use("/monedas", monedas)
app.use("/transacciones", transacciones)

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000")
})

app.get("/", (req, res) => {
    res.render("home")
})

const auth = require("./routes/auth")

app.use("/auth", auth)