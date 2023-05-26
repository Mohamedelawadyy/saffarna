const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.db = router.db;

server.use(auth);

server.use(router);

const port = process.env.PORT || 9000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
