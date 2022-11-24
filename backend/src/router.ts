import {IncomingMessage, ServerResponse} from "http";
import {getTask, getUser} from "./crud";

interface IRouter {
    [id: string] : {path: string[], func: (crud: IDispatcher) => void}[]
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

// Всё, что может потребоваться обработчику http запросов, моё dependency inversion
// Пока только используемые поля, но можно будет увеличить количество данных
export interface IDispatcher {
    // Данные запроса
    request: {
        method: string,
        httpVersion: string,
        rawHeaders: string[],
        url: string
    },
    // Данные ответа клиенту, в том числе функции для отправки
    response: {
        writeHead: (statusCode: number, headers: {[name: string]: string}) => void,
        send: (data: string) => void
        json: (data: object) => void
    }
}

const httpDispatcher = (req: IncomingMessage, res: ServerResponse): IDispatcher => {
    return {
        request: {
            method: req.method || '',
            httpVersion: req.httpVersion,
            rawHeaders: req.rawHeaders,
            url: req.url || ''
        },
        response: {
            writeHead: (statusCode: number, headers: {[name: string]: string}) => res.writeHead(statusCode, headers),
            send: (data) => res.end(data),
            json: (data) => res.end(JSON.stringify(data))
        }
    }
}
//* Выбор функции, пути заданы в массиве
export default function router(method: string, path: string[], req: IncomingMessage, res: ServerResponse) {
    let methodPath =  routerStorage[method]
    let r = methodPath.find(storage => {
        if (storage.path.length != path.length)
            return false
        for (let i = 0; i < path.length; i++) {
            // параметры с двоеточием в начале считаю переменными, которые могут быть любого значения
            if (storage.path[i].startsWith(':'))
                continue
            if (storage.path[i] != path[i])
                return false
        }
        return true
    })
    const dispatcher = httpDispatcher(req, res)
    if (r) {
        r.func(dispatcher)
    } else {
        res.statusCode = 404
        res.statusMessage = 'not found'
        res.end('not found')
    }
}