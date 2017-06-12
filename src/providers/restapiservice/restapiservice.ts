import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestapiserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestapiserviceProvider {
  data: any;
  apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(public http: Http) {
    console.log('Hello RestapiserviceProvider Provider');
  }

  getData() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get("https://restful-api-dissertation.herokuapp.com/api")
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          console.log(JSON.stringify(error.json()));
        });
    });
  }

}
