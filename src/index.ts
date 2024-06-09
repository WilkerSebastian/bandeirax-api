import express from "express";
import router from "./router";
import db from "./database/connection";

const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(PORT, async () => {
 
    try {
    
        await db.connect()

        console.log(`Running on port ${PORT}`)

    } catch (error) {
        
        console.log(error)

    }

})