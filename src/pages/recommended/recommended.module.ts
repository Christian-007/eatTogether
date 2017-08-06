import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecommendedPage } from './recommended';

@NgModule({
  declarations: [
    RecommendedPage,
  ],
  imports: [
    IonicPageModule.forChild(RecommendedPage),
  ],
  exports: [
    RecommendedPage
  ]
})
export class RecommendedPageModule {}
