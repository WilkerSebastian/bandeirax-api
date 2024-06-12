import { expect, test } from "bun:test";
import db from "../src/database/connection";

const PORT = process.env.PORT;

(async() => {

    await db.query(`DELETE FROM public."user";`)

})();

test("Banderiax user create", async() => {

    const res = await fetch(`http://localhost:${PORT}/user/create/`, {
        method: "POST",
        body: JSON.stringify({
            name: "test",
            email: "test@gmail.com",
            password: "test",
        }),
        headers: { "Content-Type": "application/json" }
    })

    const json = await res.json()

    if (res.status != 201) throw new Error(json.message)

    expect(json.email).toBe("test@gmail.com")

})