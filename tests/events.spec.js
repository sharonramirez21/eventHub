const request = require("supertest");
const app = require("../server");

describe("Events Routes", () => {
    test("GET /events should return all events", async () => {
        const res = await request(app).get("/events");
        expect(res.statusCode).toBeDefined();
        expect(res.headers["content-type"]).toMatch(/json/);
    });

    test("GET /events/:id should return one event", async () => {
        const res = await request(app).get("/events/:id");
        expect(res.statusCode).toBeDefined();
        expect(res.headers["content-type"]).toMatch(/json/);
    });

});