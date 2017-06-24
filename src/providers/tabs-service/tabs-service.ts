import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TabsServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TabsServiceProvider {
  data: any;

  constructor(public http: Http) {
    console.log('Hello TabsServiceProvider Provider');

  }

  createEventPost(title: string, description: string, location: string, startdate: any, starttime: any, enddate: any, endtime: any, type: any, user_id: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
 
    var params = 'title='+title+'&'+'description='+description+'&'+'location='+location+'&'+'startdate='+startdate+'&'+'starttime='+starttime+'&'+'enddate='+enddate+'&'+'endtime='+endtime+'&'+'type='+type+'&'+'user_id='+user_id;

    return new Promise(resolve => {
      this.http.post("http://localhost:5000/create_events", params , {headers: headers})
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getAllEvents() {
    return new Promise(resolve => {
      this.http.get("http://localhost:5000/events")
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          console.log(JSON.stringify(error.json()));
        });
    });
  }

  getMyEvents(user_id: any) {
    return new Promise(resolve => {
      this.http.get("http://localhost:5000/my_events/"+user_id)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          console.log(JSON.stringify(error.json()));
        });
    });
  }

  getUpcomingEvents(user_id: any) {
    return new Promise(resolve => {
      this.http.get("http://localhost:5000/upcoming_events/"+user_id)
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
