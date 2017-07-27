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
  fname: string; lname: string;
  email: string; location:string;
  profile_pic: string; cover_pic: string;
 
  constructor(id: string, fname: string, lname: string, email: string, location:string, profile_pic:string, cover_pic:string) {
    this.id = id;
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.location = location;
    this.profile_pic = profile_pic;
    this.cover_pic = cover_pic;
  }
}

@Injectable()
export class RestapiserviceProvider {
  currentUser: User;
  data: any;
  // ipAddress = "http://localhost:5000";
  ipAddress = "http://192.168.1.23:5000";
  // ipAddress = "http://143.167.210.82:5000";
  // ipAddress = "https://restful-api-dissertation.herokuapp.com";
  param: any;

  constructor(public http: Http) {
    console.log('Hello RestapiserviceProvider Provider');
  }

  getData() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      // this.http.get("https://restful-api-dissertation.herokuapp.com/users")
      this.http.get(this.ipAddress+"/users")
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
 
    var params = 'email='+email+'&'+'password='+password;

    return new Promise(resolve => {
      // this.http.post("http://localhost:5000/login", params , {headers: headers})
      // this.http.post("https://restful-api-dissertation.herokuapp.com/login", params , {headers: headers})
      this.http.post(this.ipAddress+"/login", params , {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          // console.log("Data: " + data["id"]);
          this.currentUser = new User(data["id"], data["fname"], data["lname"], data["email"], data["location"], data["profile_pic"], data["cover_pic"]);
          resolve(this.data);
        });
    });
  }

  getOneUserInfo(user_id: any) {
    return new Promise(resolve => {
      this.http.get(this.ipAddress+"/user/"+user_id)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          console.log(JSON.stringify(error.json()));
        });
    });
  }

  updateUserPassword(user_id: any, old_pass: string, new_pass: string ){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
 
    var params = 'old_pass='+old_pass+'&'+'new_pass='+new_pass;

    return new Promise(resolve => {
      this.http.put(this.ipAddress+"/edit_pass/"+user_id, params , {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    });
  }

  updateUserDetails(user_id: any, fname: string, lname: string, email: string, location: string, cover_pic: string, user_pic: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
 
    var params = 'fname='+fname+'&'+'lname='+lname+'&'+'email='+email+'&'+'location='+location+'&'+'cover_pic='+cover_pic+'&'+'user_pic='+user_pic;

    return new Promise(resolve => {
      this.http.put(this.ipAddress+"/edit_user/"+user_id, params , {headers: headers})
        .subscribe(data => {
          this.data = data;
          // this.currentUser.id = id;
          // this.currentUser.fname = fname;
          // this.currentUser.lname = lname;
          // this.currentUser.email = email;
          // this.currentUser.location = location;
          // this.currentUser.profile_pic = profile_pic;
          // this.currentUser.cover_pic = cover_pic;
          resolve(this.data);
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
