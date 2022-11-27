import {IncomingMessage, ServerResponse} from "http";
import {getTask, getTasksByDate, getUser, postTask} from "./crud";
import url from "url";

interface IRouter {
    [id: string] : {path: string[], func: (crud: IDispatcher) => void}[]
}

type map = {[name: string]: string}
type mapQuery = {[name: string]: string | string[] | undefined}

let routerStorage: IRouter = {
    "GET": [{
        path: ['task', ':id'],
        func: getTask
    },{
        path: ['tasks'],
        func: getTasksByDate
    },{
        path: ['user', ':id'],
        func: getUser
    }],
    "POST": [{
        path: ['task'],
        func: postTask
    }]
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
        writeHead: (statusCode: number, headers: map) => void,
        send: (data: string) => void
        json: (data: object) => void
    },
    // Всякие переменные /task/:id => {id: value}
    params: map,
    query: mapQuery,
    body?: map
}

const httpDispatcher = (req: IncomingMessage, res: ServerResponse, params: map, query: mapQuery, body?: map): IDispatcher => {
    return {
        request: {
            method: req.method || '',
            httpVersion: req.httpVersion,
            rawHeaders: req.rawHeaders,
            url: req.url || ''
        },
        response: {
            writeHead: (statusCode: number, headers: map) => res.writeHead(statusCode, headers),
            send: (data) => res.end(data),
            json: (data) => res.end(JSON.stringify(data))
        },
        params: params,
        query: query,
        body: body
    }
}
//* Выбор функции, пути заданы в массиве
export default function router(req: IncomingMessage, res: ServerResponse) {
    const method = req.method!
    const req_url = url.parse(req.url!, true)
    const path = req_url.pathname?.split(/\/+/).filter(str => str.length > 0)! // localhost/api/ => localhost/api
    const methodPath =  routerStorage[method]
    let params: map  = {}
    const r = methodPath.find(storage => {
        if (storage.path.length != path.length)
            return false
        for (let i = 0; i < path.length; i++) {
            // параметры с двоеточием в начале считаю переменными, которые могут быть любого значения
            if (storage.path[i].startsWith(':')) {
                params[storage.path[i].replace(':', '')] = path[i]
                continue
            }
            if (storage.path[i] != path[i])
                return false
        }
        return true
    })
    let dispatcher: IDispatcher
    let rawBody = '';
    let body: map | undefined = undefined
    req.on('data', (chunk) => {
        rawBody += chunk.toString();
    }).on('end', () => {
        console.log(rawBody)
        try {
            body = JSON.parse(rawBody)
        }
        catch (e) {
            console.log("Error parse ", rawBody)
        }
        dispatcher = httpDispatcher(req, res, params, req_url.query, body)
        console.log(dispatcher.params, dispatcher.query, body)
        if (r) {
            r.func(dispatcher)
        } else {
            res.statusCode = 404
            res.statusMessage = 'not found'
            res.end('not found')
        }
    });




}