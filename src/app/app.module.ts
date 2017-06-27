import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CreatePage } from '../pages/create/create';
import { SignupPage } from '../pages/signup/signup';
import { RestapiserviceProvider } from '../providers/restapiservice/restapiservice';
import { SignupServiceProvider } from '../providers/signup-service/signup-service';

import { TabsPage } from '../pages/tabs/tabs';
import { EventTabPage } from '../pages/event-tab/event-tab';
import { ProfileTabPage } from '../pages/profile-tab/profile-tab';
import { HomeTabPage } from '../pages/home-tab/home-tab';
import { MapsTabPage } from '../pages/maps-tab/maps-tab';
import { TabsServiceProvider } from '../providers/tabs-service/tabs-service';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    TabsPage,
    EventTabPage,
    ProfileTabPage,
    HomeTabPage,
    MapsTabPage,
    CreatePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    TabsPage,
    EventTabPage,
    ProfileTabPage,
    HomeTabPage,
    MapsTabPage,
    CreatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestapiserviceProvider,
    SignupServiceProvider,
    TabsServiceProvider
  ]
})
export class AppModule {}
