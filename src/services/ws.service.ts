import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WsService {

    private ws: WebSocket;

    constructor() { }

    createWsServe(url: string): Observable<any> {
        this.ws = new WebSocket(url);
        return new Observable(ob => {
            this.ws.onmessage = (event) => {
                ob.next(event.data);
            };
            this.ws.onerror = (event) => {
                ob.error('连接失败');
            };
            this.ws.onclose = () => {
                ob.complete();
            }
        })
    }

    sendMessage(str:string) {
        this.ws.send(str);
    }

}
