import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ToastService} from "./services/toast-service";
import {NetworkService} from "./services/network";
import {Network} from "@ionic-native/network";
import {LoginPage} from "../pages/login";
import {ProfilePage} from "../pages/profile";
import {Service} from "./services/service";
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {rootReducer} from "./reducers";
import {AdminHomePage} from "../pages/Admin/home";
import {SignupMemberPage} from "../pages/signup-member";
import {AddMemberPage} from "../pages/add-member";
import {Repository} from "./repository/repository";
import {BackButtonService} from "./services/back-button";
import {BackgroundMode} from "@ionic-native/background-mode";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    AdminHomePage,
    SignupMemberPage,
    AddMemberPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    StoreModule.forRoot(rootReducer),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    AdminHomePage,
    SignupMemberPage,
    AddMemberPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ToastService,
    NetworkService,
    Network,
    Service,
    Repository,
    BackButtonService,
    BackgroundMode,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
