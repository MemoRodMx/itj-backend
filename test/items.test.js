const app = require("../src/index");
const supertest = require("supertest");

describe("GET: call items read", () => {
  test("Response should be a 200 code", async () => {
    const response = await supertest(app).get("/items").send();
    expect(response.status).toBe(200);
  });
});
