import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
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
      this.http.get("https://restful-api-dissertation.herokuapp.com/users")
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          console.log(JSON.stringify(error.json()));
        });
    });
  }

  getUserLogin(email: string, password: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
 
    var params = 'email='+email+'&'+'&'+'password='+password;

    return new Promise(resolve => {
      // this.http.post("https://restful-api-dissertation.herokuapp.com/signup", params , {headers: headers})
      this.http.post("http://localhost:5000/login", params , {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

}