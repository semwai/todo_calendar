import {IDispatcher} from "./router";

export function getTask(dispatcher: IDispatcher) {
    console.log(dispatcher)
    dispatcher.response.writeHead( 200, {'Content-Type':'application/json'});
    dispatcher.response.json({
        task: 'GET task'
    })
}

export function getUser(dispatcher: IDispatcher) {
    dispatcher.response.writeHead( 200, {'Content-Type':'application/json'});
    dispatcher.response.json({
        task: 'GET user'
    })
}