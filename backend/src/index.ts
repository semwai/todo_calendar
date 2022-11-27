import {IncomingMessage, ServerResponse} from "http";
import http from 'http'
import router from "./router";

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    router(req, res)
});

server.listen(8000);