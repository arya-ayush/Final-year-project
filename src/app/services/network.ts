import {Injectable} from "@angular/core";
import {Network} from "@ionic-native/network";
import {ToastService} from "./toast-service";

@Injectable()
export class NetworkService {
  constructor(private network: Network, private toast: ToastService) {
  }

  networkDetection() {
    this.network.onConnect().subscribe(() => {
      this.toast.success('connected to internet')
    });
    this.network.onDisconnect().subscribe(() => {
      this.toast.error('please get connected to internet')
    })
  }
}
