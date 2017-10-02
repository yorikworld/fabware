import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ImdbProvider} from '../providers/imdb/imdb';
import {HttpModule} from '@angular/http';
import {IonicStorageModule} from "@ionic/storage";
import {SharedProvider} from '../providers/shared/shared';
import {TrailerComponent} from "../components/trailer/trailer.component";
import {VideoPlayer} from "@ionic-native/video-player";
import {BestPageModule} from "../pages/best/best.module";
import {DecadePageModule} from "../pages/decade/decade.module";
import {FavoritesPageModule} from "../pages/favorites/favorites.module";


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    TrailerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'fapware',
      driverOrder: ['indexeddb']
    }),
    BestPageModule,
    DecadePageModule,
    FavoritesPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    TrailerComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImdbProvider,
    SharedProvider,
    VideoPlayer
  ]
})
export class AppModule {
}
