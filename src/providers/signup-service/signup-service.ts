import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';

/*
  Generated class for the SignupServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SignupServiceProvider {
  data: any;
  // "http://localhost:5000/signup"
  // ipAddress = "http://192.168.1.31:5000";
  ipAddress = "http://143.167.211.7:5000";

  constructor(public http: Http, public restapiService: RestapiserviceProvider) {
    console.log('Hello SignupServiceProvider Provider');
  }

  signupPost(fname: string, lname: string, email: string, location: string, password: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
 
    var params = 'fname='+fname+'&'+'lname='+lname+'&'+'email='+email+'&'+'location='+location+'&'+'password='+password;

    return new Promise(resolve => {
      // this.http.post("https://restful-api-dissertation.herokuapp.com/signup", params , {headers: headers})
      this.http.post(this.restapiService.ipAddress+"/signup", params , {headers: headers})
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

}
