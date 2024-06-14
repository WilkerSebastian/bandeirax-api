import { expect, test } from "bun:test";
import db from "../src/database/connection";

const PORT = process.env.PORT;

(async() => {

    await db.query(`DELETE FROM public."user";`)

})();

test("Banderiax user create", async() => {

    let res = await fetch(`http://localhost:${PORT}/user/create/`, {
        method: "POST",
        body: JSON.stringify({
            name: "test",
            email: "test@gmail.com",
            password: "test",
        }),
        headers: { "Content-Type": "application/json" }
    })

    let json = await res.json()

    if (res.status != 201) throw new Error(json.message)

    expect(json.email).toBe("test@gmail.com")

    res = await fetch(`http://localhost:${PORT}/user/create/`, {
        method: "POST",
        body: JSON.stringify({
            name: "alphabet",
            email: "clucati.him@gmail.com",
            password: "locatehim",
        }),
        headers: { "Content-Type": "application/json" }
    })

    json = await res.json()

    if (res.status != 201) throw new Error(json.message)
    
    expect(json.email).toBe("clucati.him@gmail.com")

    res = await fetch(`http://localhost:${PORT}/user/create/`, {
        method: "POST",
        body: JSON.stringify({
            name: "pedra lopus",
            email: "vimbest@gmail.com",
            password: "labaros los kaiser",
        }),
        headers: { "Content-Type": "application/json" }
    })

    json = await res.json()

    if (res.status != 201) throw new Error(json.message)

    expect(json.email).toBe("vimbest@gmail.com")

})