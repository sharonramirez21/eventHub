const request = require("supertest");
const app = require("../server");

describe("Registrations Routes", () => {
    test("GET /registrations should return all registrations", async () => {
        const res = await request(app).get("/registrations");
        expect(res.statusCode).toBeDefined();
        expect(res.headers["content-type"]).toMatch(/json/);
    });
    test("GET /registrations/:id should return one registration", async () => {
        const res = await request(app).get("/registrations/:id");
        expect(res.statusCode).toBeDefined();
        expect(res.headers["content-type"]).toMatch(/json/);
    });
})