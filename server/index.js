const queryString = require("query-string");
const auth = require("json-server-auth");
const jsonServer = require("json-server");
const { faker } = require("@faker-js/faker");

const server = jsonServer.create();
const router = jsonServer.router("./server/db.json");
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

//Custom router
router.render = (req, res) => {
  let data = res.locals.data;
  const header = res.getHeaders();
  const totalCount = header["x-total-count"];

  if (req.method === "GET" && totalCount) {
    const queryParams = queryString.parse(req._parsedOriginalUrl.query);

    data = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 5,
        _totalRows: Number.parseInt(totalCount),
      },
    };
  }

  if (res.statusCode >= 400) {
    data = {
      code: res.statusCode,
      message: "Error",
    };
  }

  return res.jsonp(data);
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
      req.body.id = faker.datatype.uuid();
      req.body.created_at = Date.now();
      req.body.updated_at = Date.now();
      req.body.is_deleted = false;
      break;
    }
    case "PATCH": {
      req.body.created_at = Date.now();
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
