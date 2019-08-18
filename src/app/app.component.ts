import { Component } from '@angular/core';
import { SocketService } from "./socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private service: SocketService){}

  private currentPrices = {
    btcusd: "Loading...",
    btceur: "Loading...",
    ethusd: "Loading...",
    etheur: "Loading..."
  };

  updatePrices = message => {
    if (message.data.price) {
      switch (message.channel) {
        case "live_trades_btcusd":
          this.currentPrices.btcusd = message.data.price;
          break;
        case "live_trades_btceur":
          this.currentPrices.btceur = message.data.price;
          break;
        case "live_trades_etheur":
          this.currentPrices.etheur = message.data.price;
          break;
        case "live_trades_ethusd":
          this.currentPrices.ethusd = message.data.price;
          break;
        default:
          break;
      }
    }
  }

  private testMess:object = {};

  ngOnInit() {
    console.log(this.testMess);
    setTimeout(() => {
      console.log(this.testMess);
    }, 1000)
    this.service.listenSocket();
    this.service.testObs.subscribe(
      message => this.testMess = message
    )
    this.service.currentPrice.subscribe(
      message => this.updatePrices(message),
      error => console.log("There has been an error: ", error),
      () => console.log("Socket closed, commununication completed")
    )
  }
}
