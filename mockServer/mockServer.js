const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('mockServer/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use('/api', router);

server.listen(3004, () => {
    console.log('Mock Server is running on port 3004');
});
