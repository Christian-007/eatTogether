import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestapiserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export class User {
  id: string;
  fname: string;
  lname: string;
  email: string;
  location:string;
 
  constructor(id: string, fname: string, lname: string, email: string, location:string) {
    this.id = id;
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.location = location;
  }
}

@Injectable()
export class RestapiserviceProvider {
  currentUser: User;
  data: any;
  apiUrl = "http://localhost:5000/signup";

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
      // this.http.post("http://localhost:5000/login", params , {headers: headers})
      this.http.post("https://restful-api-dissertation.herokuapp.com/login", params , {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          // console.log("Data: " + data["id"]);
          this.currentUser = new User(data["id"], data["fname"], data["lname"], data["email"], data["location"]);
          resolve(this.data);
        });
    });
  }

  getOneUserInfo(user_id: any) {
    return new Promise(resolve => {
      this.http.get("https://restful-api-dissertation.herokuapp.com/user/" + user_id)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          console.log(JSON.stringify(error.json()));
        });
    });
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    this.currentUser = null;
  }

}
