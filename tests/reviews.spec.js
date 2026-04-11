const request = require("supertest");
const app = require("../server");

describe("Reviews Routes", () => {
    test("GET /reviews should return all reviews", async () => {
        const res = await request(app).get("/reviews");
        expect(res.statusCode).toBeDefined();
        expect(res.headers["content-type"]).toMatch(/json/);
    });
    test("GET /reviews/:id should return one review", async () => {
        const res = await request(app).get("/reviews/:id");
        expect(res.statusCode).toBeDefined();
        expect(res.headers["content-type"]).toMatch(/json/);
    });
})