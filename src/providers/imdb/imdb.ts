import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';

/*
  Generated class for the ImdbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImdbProvider {
 private token: string;
 private host: string;
 private service: string;
 private api: string;

  constructor(private http: Http) {
    this.token = '6700a56e-1070-4b87-9e81-3a585783c7dd';
    this.host = 'http://www.myapifilms.com';
    this.service = '/imdb';
    this.api = this.host + this.service;
  }

  getTrailers(){
    let options = this.encodeQueryData({'format': 'json', 'trailers': 2, 'page': 0, 'token': this.token});
//    return this.get(this.api + '/trailers', {search: options});
    return this.get('assets/trailers.json', {search: options});
  }

  getTop(start, end, data = 0, format = 'json'){

    let options = this.encodeQueryData({'start':start, 'end':end,'format':format,'data':data,'token':this.token});
//    return this.get(this.api + '/top', {search: options});
    return this.get('assets/movieData.json', {search: options});
  }

  encodeQueryData(data) {
    let ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
  }

  get(url, options){
    return this.http.get(url, options);
  }
}
