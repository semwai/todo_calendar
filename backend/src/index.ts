import {IncomingMessage, ServerResponse} from "http";
import url from 'url'
import http from 'http'
import router from "./router";

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    let req_url = url.parse(req.url!, true)
    let path = req_url.pathname?.split(/\/+/).filter(str => str.length > 0)! // localhost/api/ == localhost/api
    router(req.method!, path, req, res)
});

server.listen(8000);