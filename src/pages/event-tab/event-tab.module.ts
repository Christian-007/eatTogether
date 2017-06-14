import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventTabPage } from './event-tab';

@NgModule({
  declarations: [
    EventTabPage,
  ],
  imports: [
    IonicPageModule.forChild(EventTabPage),
  ],
  exports: [
    EventTabPage
  ]
})
export class EventTabPageModule {}
