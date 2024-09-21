import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const return200 = (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
};

const return404 = (req, res) => {
    res.writeHead(404, { "Content-Type": "text/html" });
};

const page404 = async (req, res) => {
    try {
        let errorPage = await fs.readFile(__dirname + "/project/404.html");
        res.write(errorPage);
    } catch (error) {
        console.log("Couldn't load webpage:", error);
    }
};

const server = http.createServer(async (req, res) => {
    console.log(req.method, req.url);

    try {
        if (req.method === "GET") {
            if (req.url === "/") {
                return200(req, res);
                let file = await fs.readFile(__dirname + "/project/index.html");
                res.write(file);
            } else if (req.url === "/about") {
                return200(req, res);
                let file = await fs.readFile(__dirname + "/project/about.html");
                res.write(file);
            } else if (req.url === "/contact-me") {
                return200(req, res);
                let file = await fs.readFile(__dirname + "/project/contact-me.html");
                res.write(file);
            } else {
                return404(req, res);
                page404(req, res);
            }
        } else {
            return404(req, res);
            page404(req, res);
        }
    } catch (error) {
        console.log("Couldn't load webpage:", error);
    }

    res.end();
});

server.listen(8080);
