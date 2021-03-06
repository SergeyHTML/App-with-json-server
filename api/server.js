const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const shortid = require('shortid');

server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {

    if (req.method === 'DELETE' && req.url === '/archives') {
        const agentsArchive =  router.db.get('agents')
            .cloneDeep().value();

        router.db.get('archives')
            .push({ id: shortid.generate(), date: Date.now(), missions: agentsArchive})
            .write();
        router.db.get('agents')
            .remove(agent => agent)
            .write();
    }

    next()
});

// Use default router
server.use(router);
server.listen(3001, () => {
    console.log('JSON Server is running')
});
