//import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";
import express from "express";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*const return200 = (req, res, type = "text/html") => {
    //res.writeHead(200, { "Content-Type": type });
    res.set({ "Content-Type": type });
    res.status(200);
};

const return404 = (req, res, type = "text/html") => {
    //res.writeHead(404, { "Content-Type": type });
    res.set({ "Content-Type": type });
    res.status(404);
};*/

const returnCode = (req, res, statusCode = 200, type = "text/html") => {
    //res.writeHead(200, { "Content-Type": type });
    res.set({ "Content-Type": type });
    res.status(statusCode);
};

const page404 = async (req, res) => {
    let errorPage = await fs.readFile(__dirname + "/project/404.html");
    //res.write(errorPage);
    res.send(errorPage);
    res.end();
};

const normalProjectReturner = async (req, res) => {
    //console.log(__dirname + "/project" + req.url);
    let finalPath = req.url === "/" ? "/index.html" : req.url + ".html";
    //console.log(finalPath);
    let file = await fs.readFile(__dirname + "/project" + finalPath);
    //res.write(file);
    res.send(file);
    res.end();
};

/*const otherResourceReturner = async (req, res) => {
    //console.log(__dirname + req.url);
    let file = await fs.readFile(__dirname + req.url);
    //res.write(file);
    res.send(file);
    res.end();
};*/

const app = express();

app.use(async (req, res, next) => {
    console.log(req.method, req.url, req.headers.accept);
    next();
});

app.use("/styles", express.static(path.join(__dirname + "/styles")));
app.use("/styles", express.static(path.join(__dirname + "/project")));

app.get(["/", "/about", "/contact-me"], async (req, res) => {
    returnCode(req, res);
    await normalProjectReturner(req, res);
});

/*app.get(["/style.css", "/styles/404.css"], async (req, res) => {
    returnCode(req, res, 200, "text/css");
    await otherResourceReturner(req, res);
});*/

app.use(async (req, res) => {
    returnCode(req, res, 404);
    await page404(req, res);
});

/*const server = http.createServer(async (req, res) => {
    console.log(req.method, req.url, req.headers.accept);

    try {
        if (req.method === "GET") {
            if (req.url === "/" || req.url === "/about" || req.url === "/contact-me") {
                return200(req, res);
                await normalProjectReturner(req, res);
            } else if (req.url.substring(0, 8) === "/styles/") {
                if (req.url === "/styles/style.css" || req.url === "/styles/404.css") {
                    return200(req, res, "text/css");
                    await otherResourceReturner(req, res);
                } else {
                    return404(req, res, "text/css");
                    res.write("* {  file: notFound  };");
                    res.end();
                }
            } else {
                return404(req, res);
                await page404(req, res);
            }
        } else {
            return404(req, res);
            await page404(req, res);
        }
    } catch (error) {
        throw new Error(error);
    }
});*/

//server.listen(8080);
app.listen(8080);
