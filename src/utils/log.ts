import { randomBytes } from "crypto"

async function log(message: any) {

    if (process.env.NODE_ENV == "development") {

        await Bun.write(`logs/${randomBytes(2).toString("hex") + new Date().getTime()}.log`, JSON.stringify(message))

    }

}

export {log}