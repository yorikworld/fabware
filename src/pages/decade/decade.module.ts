import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DecadePage } from './decade';

@NgModule({
  declarations: [
    DecadePage,
  ],
  imports: [
    IonicPageModule.forChild(DecadePage),
  ],
  entryComponents: [
    DecadePage
  ]
})
export class DecadePageModule {}
