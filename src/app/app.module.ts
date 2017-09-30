import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {BestPage} from "../pages/best/best";
import {DecadePage} from "../pages/decade/decade";
import {FavoritesPage} from "../pages/favorites/favorites";
import { ImdbProvider } from '../providers/imdb/imdb';
import {HttpModule} from '@angular/http';
import {IonicStorageModule} from "@ionic/storage";
import { SharedProvider } from '../providers/shared/shared';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    BestPage,
    DecadePage,
    FavoritesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'fapware',
      driverOrder: ['indexeddb']
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    BestPage,
    DecadePage,
    FavoritesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImdbProvider,
    SharedProvider
  ]
})
export class AppModule {}
