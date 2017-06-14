import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { HomeTabPage } from '../home-tab/home-tab';

@NgModule({
  declarations: [
    TabsPage,
    HomeTabPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
  ]
})
export class TabsPageModule {}
