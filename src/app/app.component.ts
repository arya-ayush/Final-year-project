import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {NetworkService} from "./services/network";
import {LoginPage} from "../pages/login";
import {AdminHomePage} from "../pages/Admin/home";
import {BackButtonService} from "./services/back-button";
import {Repository} from "./repository/repository";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public network: NetworkService,
              public repository: Repository,
              public backButtonService: BackButtonService) {
    this.initializeApp();
    this.network.networkDetection();

    if (this.platform.is('android')) {
      this.backButtonService.handleBackButton();
    }

    if (this.repository.hasLoginTokenUser()) {
      this.rootPage = HomePage;
    }
    else if (this.repository.hasLoginTokenAdmin()) {
      this.rootPage = AdminHomePage;
    }
    else {
      this.rootPage = LoginPage;
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      var notificationOpenedCallback = function(jsonData) {
        // write code to open app here later
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window["plugins"].OneSignal
        .startInit("a0944a39-671f-4402-9737-7621eae222b0", "1095666574421")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();

    });
  }
}

