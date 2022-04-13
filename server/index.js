const queryString = require("query-string");
const auth = require("json-server-auth");
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("./server/db.json");
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

//Custom router
router.render = (req, res) => {
  const header = res.getHeaders();
  const totalCount = header["x-total-count"];

  if (req.method === "GET" && totalCount) {
    const queryParams = queryString.parse(req._parsedOriginalUrl.query);

    const response = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 5,
        _totalRows: Number.parseInt(totalCount),
      },
    };

    return res.jsonp(response);
  }

  return res.jsonp(res.locals.data);
};

// Create route Permisssions
const rules = auth.rewriter({
  // Permission rules
  users: 660,
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  switch (req.method) {
    case "POST": {
      req.body.createdAt = Date.now();
      break;
    }
    default:
      break;
  }
  // Continue to JSON Server router
  next();
});

// /!\ Bind the router db to the app
server.db = router.db;

// Use default router
server.use(rules);
server.use(auth);
server.use(router);
server.listen(5000, () => {
  console.log("JSON Server is running");
});
