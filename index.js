const commandLineArgs = require("command-line-args");
const http = require("http");
const httpProxy = require("http-proxy");


const options = commandLineArgs([
    { name: "port", alias: "p", type: Number, defaultValue: 8081 },
    { name: "target", alias: "t", type: String, defaultValue: "https://testing.greenscreens.ai" }
]);


const proxy = httpProxy.createProxyServer({
    target: options.target,
    secure: true,
    changeOrigin: true
}).on("error", function (err, req, res) {
    sendError(res, err);
}).on("proxyRes", function (proxyRes, req, res) {
    enableCors(req, res);
});


http.createServer(function (req, res) {
    proxy.web(req, res, {}, err => sendError(res, err));
}).listen(options.port);


console.log("Proxy to", options.target, "listening on port", options.port);



function sendError(res, err) {
    return res.status(500).send({
        error: err,
        message: "An error occured in the proxy"
    });
};

function enableCors(req, res) {
    if (req.headers["access-control-request-method"]) {
        res.setHeader("access-control-allow-methods", req.headers["access-control-request-method"]);
    }

    if (req.headers["access-control-request-headers"]) {
        res.setHeader("access-control-allow-headers", req.headers["access-control-request-headers"]);
    }

    if (req.headers.origin) {
        res.setHeader("access-control-allow-origin", req.headers.origin);
        res.setHeader("access-control-allow-credentials", "true");
    }
};
