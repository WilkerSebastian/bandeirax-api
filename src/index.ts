import express from "express";
import router from "./router";

const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(PORT, () => console.log(`Running on port ${PORT}`))