import http from "http";

function return200(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
}

function return404(req, res) {
    res.writeHead(404, { "Content-Type": "text/html" });
}

const server = http.createServer((req, res) => {
    console.log(req.method, req.url);

    if (req.method === "GET") {
    } else {
        return404(req, res);
        // 404.html
    }

    res.end();
});

server.listen(8080);
