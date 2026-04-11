const request = require('supertest');
const app = require("../server");

describe("Users Routes", () => {
    test("GET /users should return all users", async () => {
        const res = await request(app).get("/users");
        expect(res.statusCode).toBeDefined();
        expect(res.headers["content-type"]).toMatch(/json/);
    });
    test("GET /users/:id should return one user", async () => {
        const res = await request(app).get("/users/:id");
        expect(res.statusCode).toBeDefined();
        expect(res.headers["content-type"]).toMatch(/json/);
    });
})