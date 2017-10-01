import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BestPage } from './best';

@NgModule({
  declarations: [
    BestPage,
  ],
  imports: [
    IonicPageModule.forChild(BestPage),
  ],
  entryComponents: [
    BestPage
  ]
})
export class BestPageModule {}
