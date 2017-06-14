import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapsTabPage } from './maps-tab';

@NgModule({
  declarations: [
    MapsTabPage,
  ],
  imports: [
    IonicPageModule.forChild(MapsTabPage),
  ],
  exports: [
    MapsTabPage
  ]
})
export class MapsTabPageModule {}
