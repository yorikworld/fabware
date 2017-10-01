import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {fromPromise} from "rxjs/observable/fromPromise";
import {TrailerComponent} from "../../components/trailer/trailer.component";
import {ModalController} from "ionic-angular";

/*
  Generated class for the SharedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedProvider {
  private movies: BehaviorSubject<Array<Object>>;

  constructor(public http: Http, public storage: Storage, public modalCtrl: ModalController) {
    this.movies = new BehaviorSubject([]);
    this.movies$ = this.getFromStorage();
  }

  getTralerPopup(movieId){
    return this.modalCtrl.create(TrailerComponent, {'movieId': movieId});
  }

  public createObservable(data): Observable<Array<Object>>{
    return Observable.create(observer => {
      observer.next(data);
      observer.complete();
    });
  }

  private getFromStorage(): Observable<Array<Object>> {
    return fromPromise(this.storage.get('top20'));
  }

  private saveToStorage(data) {
    this.storage.set('top20', data);
  }

  get movies$(): Observable<any> {
    return this.movies.asObservable();
  }

  set movies$(data: Observable<any>) {
    data.subscribe(res => {
      this.movies.next(res);
      this.saveToStorage(this.movies.getValue());
    });
  }
}
