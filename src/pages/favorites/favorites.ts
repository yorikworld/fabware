import {Component, OnDestroy} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {SharedProvider} from "../../providers/shared/shared";
import {Subscription} from "rxjs/Subscription";

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnDestroy {
  favorites: Array<Object>;
  favoritesSubscription: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public shared: SharedProvider) {
    this.favoritesSubscription = this.shared.movies$.subscribe(res => {
      this.favorites = res;
    });
  }

  removeFromFavorite(favorite): void {
    favorite.fav = !favorite.fav;
    this.shared.movies$ = this.shared.createObservable(this.favorites);
  }

  getTrailersButtons(movieId): Array<Object>{
    return this.shared.getTrailersButtons(movieId)
  }

  trailerPopup(movieId, trailerObj): void{
    let modal = this.shared.getTrailerPopup(movieId, trailerObj);
    modal.present();
  }

  ngOnDestroy() {
    this.favoritesSubscription.unsubscribe();
  }

}
