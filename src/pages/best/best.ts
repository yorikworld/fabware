import {Component, OnDestroy} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ImdbProvider} from "../../providers/imdb/imdb";
import {Storage} from "@ionic/storage";
import {SharedProvider} from "../../providers/shared/shared";
import {Subscription} from "rxjs/Subscription";

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
export class BestPage implements OnDestroy {
  movies: Array<Object> = [];
  trailers: Array<Object> = [];
  moviesSubscription: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public imdbProvider: ImdbProvider,
              public storage: Storage,
              public shared: SharedProvider) {
    this.getImdbData();
    this.getTrailersData();
  }

  getImdbData() {
    this.moviesSubscription = this.shared.movies$
      .subscribe(data => {
        if (null === data) {
          this.imdbProvider.getTop(1, 20, 1)
            .subscribe(res => {
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

  getTrailersData() {
    this.imdbProvider.getTrailers()
      .subscribe(res => {
        if (res.json().data.trailers[0]) {
          console.log(res.json().data.trailers[0].trailers);
          this.trailers = res.json().data.trailers[0].trailers;
        }
      })
  }

  favoriteBtn(movie) {
    movie.fav = !movie.fav;
    this.shared.movies$ = this.shared.createObservable(this.movies);
  }

  trailerPopup(movieId){
    let modal = this.shared.getTralerPopup(movieId);
    modal.present();
  }

  ngOnDestroy() {
    this.moviesSubscription.unsubscribe();
  }

}
