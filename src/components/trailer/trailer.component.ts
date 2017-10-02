import {Component} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  templateUrl: 'trailer.component.html'
})
export class TrailerComponent {
  private movieId: string;
  private trailerObj: Array<Object>;
  public src: SafeUrl;

  constructor(params: NavParams,
              public viewCtrl: ViewController,
              private sanitizer: DomSanitizer) {
    this.movieId = params.get('movieId');
    this.trailerObj = params.get('trailerObj');
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(this.trailerObj['embed']);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}