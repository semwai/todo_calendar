import {IncomingMessage, ServerResponse} from "http";

let http = require('http')

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        data: 'Hello World!'
    }));
});

server.listen(8000);