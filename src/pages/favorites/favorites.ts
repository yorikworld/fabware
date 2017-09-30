import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {SharedProvider} from "../../providers/shared/shared";
import {Observable} from "rxjs/Observable";

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
export class FavoritesPage implements OnInit {
  favorites: Array<Object>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public shared: SharedProvider) {
    this.shared.movies$.subscribe(res => {
      this.favorites = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  ngOnInit() {
    console.log('init');
  }

  removeFromFavorite(favorite) {
    favorite.fav = !favorite.fav;
    this.shared.movies$ = this.shared.createObservable(this.favorites);
  }

}
