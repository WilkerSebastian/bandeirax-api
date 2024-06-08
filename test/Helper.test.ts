import { expect, test } from "bun:test";

const PORT = process.env.PORT

test("Banderiax helper index", async() => {

    const res = await fetch(`http://localhost:${PORT}/`)

    const json = await res.json()

    expect(json).toEqual({
        message: "Banderiax API",
        description: `Banderiax API is an API for managing users and points fo Banderiax APP.`,
        endPoints: [
            { method: "GET", path: "/", description: "description of the API and its endpoints" },
        ]
    })

})