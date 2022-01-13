import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private _http: HttpClient
  ) { }

  login() {
    return this._http.get(Constants.GET_PEOPLE, {});
  }

  search() {
    return this._http.get(Constants.GET_PLANETS, {});
  }
}
