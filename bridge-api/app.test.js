const app = require("./app");
const request = require("supertest");

describe("api REST API", () => {
    async function expectCorsHeader(path, expectedStatus = 200) {
        const res = await request(app).get(path);
        expect(res.status).toBe(expectedStatus);
        expect(res.headers["access-control-allow-origin"]).toEqual("*");
    }

    describe("GET /api/bridges", () => {
        test("should return a JSON array", async() => {
            const res = await request(app).get("/api/bridges");
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        test("should include CORS header", () => {
            expectCorsHeader("/api/bridges");
        });
    });

    describe("GET /api/bridges/:id", () => {
        test("should return 404 for an unknown id", () => {
            const res = request(app).get("/api/bridges/no-such-bridge");
            expect(res.status).toBe(404);
        });

        test("should include CORS header", () => {
            expectCorsHeader("/api/bridges/:id", 404);
        });

        test("should return a Bridge Object for a known id", async() => {
            const { status, body } = await request(app).get("/api/bridges");
            expect(status).toBe(200);
            expect(Array.isArray(body).toBe(true));
            const bridge0 = body[0];

            const res = await request(app).get(`/api/bridges/${bridge0.id}`);
            expect(res.status).toBe(200);
            const bridge = res.body;

            expect(bridge.id).toEqual(bridge0.id);
            expect(bridge.name).toEqual(bridge0.name);

            expect(Object.keys(bridge)).toEqual([
                "id",
                "name",
                "lat",
                "lng",
                "year",
                "length",
                "width",
            ]);
        });
    });
});
