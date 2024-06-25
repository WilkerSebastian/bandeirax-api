import { expect, test } from "bun:test";
import db from "../src/database/connection";

const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;

(async () => {
    await db.query(`DELETE FROM public."user";`);
})();

test("User create", async () => {
    let res = await fetch(`http://localhost:${PORT}/user/create/${API_KEY}`, {
        method: "POST",
        body: JSON.stringify({
            name: "test",
            email: "test@gmail.com",
            password: "test",
        }),
        headers: { "Content-Type": "application/json" }
    });

    let json = await res.json();
    if (res.status != 201) throw new Error(json.message);
    expect(json.email).toBe("test@gmail.com");

    res = await fetch(`http://localhost:${PORT}/user/create/${API_KEY}`, {
        method: "POST",
        body: JSON.stringify({
            name: "alphabet",
            email: "clucati.him@gmail.com",
            password: "locatehim",
        }),
        headers: { "Content-Type": "application/json" }
    });

    json = await res.json();
    if (res.status != 201) throw new Error(json.message);
    expect(json.email).toBe("clucati.him@gmail.com");

    res = await fetch(`http://localhost:${PORT}/user/create/${API_KEY}`, {
        method: "POST",
        body: JSON.stringify({
            name: "pedra lopus",
            email: "vimbest@gmail.com",
            password: "labaros los kaiser",
        }),
        headers: { "Content-Type": "application/json" }
    });

    json = await res.json();
    if (res.status != 201) throw new Error(json.message);
    expect(json.email).toBe("vimbest@gmail.com");

    res = await fetch(`http://localhost:${PORT}/user/create/${API_KEY}`, {
        method: "POST",
        body: JSON.stringify({
            name: null,
            email: "vimbest65@gmail.com",
            password: "labaros los kaiser",
        }),
        headers: { "Content-Type": "application/json" }
    });

    json = await res.json();
    expect(json.message).toBe(`Internal server error to create user`);
});

test("User update", async () => {
    let res = await fetch(`http://localhost:${PORT}/user/create/${API_KEY}`, {
        method: "POST",
        body: JSON.stringify({
            name: "userToUpdate",
            email: "update@gmail.com",
            password: "password",
        }),
        headers: { "Content-Type": "application/json" }
    });

    let json = await res.json();
    const userId = Buffer.from(json.validate.split('/').pop(), 'base64').toString('utf8');

    res = await fetch(`http://localhost:${PORT}/user/update/${API_KEY}`, {
        method: "PUT",
        body: JSON.stringify({
            id: userId,
            name: "updatedName",
            email: "updated@gmail.com",
        }),
        headers: { "Content-Type": "application/json" }
    });

    json = await res.json();
    if (res.status != 200) throw new Error(json.message);
    expect(json.message).toBe("User updated successfully");
});

test("User delete", async () => {
    let res = await fetch(`http://localhost:${PORT}/user/create/${API_KEY}`, {
        method: "POST",
        body: JSON.stringify({
            name: "userToDelete",
            email: "delete@gmail.com",
            password: "password",
        }),
        headers: { "Content-Type": "application/json" }
    });

    let json = await res.json();

    const encodedId = Buffer.from(json.id).toString("base64");

    res = await fetch(`http://localhost:${PORT}/user/delete/${API_KEY}/${encodedId}`, {
        method: "DELETE"
    });

    json = await res.json();
    if (res.status != 200) throw new Error(json.message);
    expect(json.message).toBe("User deleted successfully");
});

test("User count", async () => {
    let res = await fetch(`http://localhost:${PORT}/user/count/${API_KEY}`, {
        method: "GET"
    });

    let json = await res.json();
    

    if (res.status != 200) throw new Error(json.message);
    expect(json.count).toBeGreaterThanOrEqual(0);
});