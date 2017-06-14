import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileTabPage } from './profile-tab';

@NgModule({
  declarations: [
    ProfileTabPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileTabPage),
  ],
  exports: [
    ProfileTabPage
  ]
})
export class ProfileTabPageModule {}
