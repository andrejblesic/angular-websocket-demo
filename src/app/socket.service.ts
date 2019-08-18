import { Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import { BehaviorSubject } from "rxjs";
import { channels } from "./channels";
import { from } from 'rxjs';

@Injectable()
export class SocketService {

  public testObs = from(fetch("http://www.mocky.io/v2/5d592dbf3000009828d84bc1").then(res => res.json()));

  private socket = webSocket("wss://ws.bitstamp.net/");

  public currentPrice = this.socket.asObservable();

  listenSocket() {
    for (let channel in channels) {
      this.socket.next(channels[channel]);
    }
  }
}
