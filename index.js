const { default: axios } = require('axios');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const queryString = require('query-string');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now();
        req.body.updateAt = Date.now();
    } else if (req.method === 'PATCH') {
        req.body.updateAt = Date.now();
    }
    // Continue to JSON Server router
    next();
});

// Custom output
router.render = (req, res) => {
    const headers = res.getHeaders();
    const totalCountHeader = headers['x-total-count'];
    if (req.method === 'GET' && totalCountHeader) {
        const queryParams = queryString.parse(req._parsedUrl.query);
        const result = {
            data: res.locals.data,
            _page: +queryParams._page || 1,
            _limit: +queryParams._limit || 10,
            total: totalCountHeader,
        };
        return res.jsonp(result);
    }

    return res.jsonp(res.locals.data);
};

// Use default router
const PORT = process.env.PORT || 3000;
server.use('/api', router);
server.listen(PORT, () => {
    console.log('🚀 ~ JSON Server is running');
});

setInterval(async function () {
    try {
        const result = await axios.get('https://helenstore.herokuapp.com/api/_page=1&_limit=1');
        console.log('🚀 ~ data: ', result);
    } catch (error) {
        console.log(error.code);
    }
}, 300000);
