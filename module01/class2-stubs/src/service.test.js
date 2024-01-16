const Service = require("./service")
const assert = require("assert")
const { createSandbox } = require("sinon")

const sinon = createSandbox()
const mocks = {
  tatooine: require("../mocks/tatooine.json"),
  alderaan: require("../mocks/alderaan.json"),
}

const BASE_URL1 = "http://swapi.dev/api/planets/1/"
const BASE_URL2 = "http://swapi.dev/api/planets/2/"

;(async () => {
  // online
  // {
  //   const service = new Service()
  //   const data = await service.makeRequest(BASE_URL2)
  //   console.log("data", JSON.stringify(data))
  // }
  const service = new Service()
  const stub = sinon.stub(service, service.makeRequest.name)

  stub.withArgs(BASE_URL1).resolves(mocks.tatooine)
  stub.withArgs(BASE_URL2).resolves(mocks.alderaan)

  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearedIn: 5,
    }
    const data = await service.getPlanets(BASE_URL1)
    assert.deepStrictEqual(data, expected)
  }

  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearedIn: 2,
    }
    const data = await service.getPlanets(BASE_URL2)
    assert.deepStrictEqual(data, expected)
  }
})()
