const http = require("http")

const DEFAULT_USER = {
  username: "admin",
  password: "admin",
}
const { once } = require("events")
const routes = {
  "/contact:get": (request, response) => {
    response.write("contact us page")
    return response.end()
  },
  "/login:post": async (request, response) => {
    const user = JSON.parse(await once(request, "data"))
    if (
      user.username !== DEFAULT_USER.username ||
      user.password !== DEFAULT_USER.password
    ) {
      response.writeHead(401)
      response.end("logging failed!")
      return
    }

    return response.end("Log in succeeded!")
  },
  default: (request, response) => {
    response.writeHead(404)
    return response.end("not found")
  },
}

const handler = (request, response) => {
  const { url, method } = request
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
  const chosenRoute = routes[routeKey] || routes.default
  return chosenRoute(request, response)
}
const app = http.createServer(handler)
app.listen(3000, () => console.log("app running at", 3000))

module.exports = app
