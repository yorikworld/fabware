import {Component} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";
import { VideoPlayer } from '@ionic-native/video-player';

@Component({
  templateUrl: 'trailer.component.html'
})
export class TrailerComponent {

  constructor(params: NavParams, public viewCtrl: ViewController, private videoPlayer: VideoPlayer) {
    console.log('movieId', params.get('movieId'));
    this.videoPlayer.play('').then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}