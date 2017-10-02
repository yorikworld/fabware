import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {fromPromise} from "rxjs/observable/fromPromise";
import {TrailerComponent} from "../../components/trailer/trailer.component";
import {Modal, ModalController} from "ionic-angular";
import {ImdbProvider} from "../imdb/imdb";

/*
  Generated class for the SharedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedProvider {
  private movies: BehaviorSubject<Array<Object>>;
  private trailers: BehaviorSubject<Array<Object>>;

  constructor(public http: Http,
              public storage: Storage,
              public modalCtrl: ModalController,
              public imdbProvider: ImdbProvider) {
    this.movies = new BehaviorSubject([]);
    this.trailers = new BehaviorSubject([]);
    this.movies$ = this.getMoviesFromStorage();
    this.trailers$ = this.getTrailersFromStorage();
  }
  get trailers$(): Observable<any>{
    return this.trailers.asObservable();
  }

  set trailers$(data: Observable<any>){
    data.subscribe(res => {
      this.trailers.next(res.json().data.trailers[0].trailers);
      console.log(this.trailers);
    })
  }

  getTrailerPopup(movieId, trailerObj): Modal{
    return this.modalCtrl.create(TrailerComponent, {'movieId': movieId, 'trailerObj': trailerObj});
  }

  public createObservable(data: Array<Object>): Observable<Array<Object>>{
    return Observable.create(observer => {
      observer.next(data);
      observer.complete();
    });
  }

  private getMoviesFromStorage(): Observable<Array<Object>> {
    return fromPromise(this.storage.get('top20'));
  }

  private getTrailersFromStorage(): Observable<any>{
    return this.imdbProvider.getTrailers();
  }

  public getTrailersButtons(movieId: string): Array<Object>{
    const result:Array<Object> = [];
    this.trailers$
      .subscribe(res => {
        res.map(item => {
          if(item['idIMDB'] === movieId)
            result.push(item);
        });
      });
    return result;
  }

  private saveToStorage(data): void {
    this.storage.set('top20', data).then();
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
