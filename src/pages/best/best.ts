import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ImdbProvider} from "../../providers/imdb/imdb";
import {Storage} from "@ionic/storage";
import {SharedProvider} from "../../providers/shared/shared";

/**
 * Generated class for the BestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-best',
  templateUrl: 'best.html',
})
export class BestPage {
  movies: Array<Object>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public imdbProvider: ImdbProvider,
              public storage: Storage,
              public shared: SharedProvider) {
    this.getImdbData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BestPage');
  }

  getImdbData() {
    this.shared.movies$.subscribe(data => {
      if (null === data) {
        this.imdbProvider.getTop(1, 20, 1)
          .subscribe(res => {
            console.log(res.json().data.movies);
            this.movies = res.json().data.movies;
            this.shared.movies$ = this.shared.createObservable(res.json().data.movies);
          },
            error => {
              console.log(error);
            });
      }
      else
        this.movies = data;
    });
  }

  favoriteBtn(movie) {
    movie.fav = !movie.fav;
    this.shared.movies$ = this.shared.createObservable(this.movies);
  }

}
