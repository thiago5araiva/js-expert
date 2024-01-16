const { describe, it, after, before } = require("mocha")
const supertest = require("supertest")
const assert = require("assert")

describe("API Suite test", () => {
  let app
  before((done) => {
    app = require("./api")
    app.once("listening", done)
  })
  after((done) => app.close(done))
  describe("/contact:get", () => {
    it("should request the contact route and return HTTP Status 200", async () => {
      const response = await supertest(app).get("/contact").expect(200)

      assert.strictEqual(response.text, "contact us page")
    })
  })
  describe("/login:post", () => {
    it("should request the login route and return HTTP Status 200", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "admin", password: "admin" })
        .expect(200)

      assert.strictEqual(response.text, "Log in succeeded!")
    })
    it("should request the login route and return HTTP Status 401", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "nimda", password: "admin" })
        .expect(401)

      assert.strictEqual(response.text, "logging failed!")
    })
  })
  describe("/hi:get", () => {
    it("should request an inexisting route /hi and redirect to /hello", async () => {
      const response = await supertest(app).get("/hi").expect(404)
      assert.strictEqual(response.text, "not found")
    })
  })
})
