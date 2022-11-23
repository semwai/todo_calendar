import {IncomingMessage, ServerResponse} from "http";

export function getTask(req: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        task: 'GET task'
    }));
}

export function getUser(req: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        task: 'GET user'
    }));
}

interface IRouter {
    [id: string] : {path: string[], func: (req: IncomingMessage, res: ServerResponse) => void}[]
}

let routerStorage: IRouter = {
    "GET": [{
        path: ['task', ':id'],
        func: getTask
    },{
        path: ['user', ':id'],
        func: getUser
    }],
}

//* Выбор функции, пути в массиве*/
export default function router(method: string, path: string[], req: IncomingMessage, res: ServerResponse) {
    let methodPath =  routerStorage[method]
    let r = methodPath.find(storage => {
        if (storage.path.length != path.length)
            return false
        for (let i = 0; i < path.length; i++) {
            if (storage.path[i].startsWith(':'))
                continue
            if (storage.path[i] != path[i])
                return false
        }
        return true
    })
    if (r) {
        r.func(req, res)
    } else {
        res.statusCode = 404
        res.statusMessage = 'not found'
        res.end('not found')
    }
}