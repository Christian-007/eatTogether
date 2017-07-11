import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';

/*
  Generated class for the TabsServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TabsServiceProvider {
  data: any;
  // ipAddress = "http://192.168.1.31:5000";
  ipAddress = "http://143.167.211.7:5000";

  constructor(public http: Http, public restapiService: RestapiserviceProvider) {
    console.log('Hello TabsServiceProvider Provider');

  }

  createEventPost(title: string, description: string, location: string, city: string, imgName: string, startdate: any, starttime: any, enddate: any, endtime: any, type: any, user_id: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
 
    var params = 'title='+title+'&'+'description='+description+'&'+'location='+location+'&'+'city='+city+'&'+'imgName='+imgName+'&'+'startdate='+startdate+'&'+'starttime='+starttime+'&'+'enddate='+enddate+'&'+'endtime='+endtime+'&'+'type='+type+'&'+'user_id='+user_id;

    return new Promise(resolve => {
      this.http.post(this.restapiService.ipAddress+"/create_events", params , {headers: headers})
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  cancelJoinEvent(user_id: any, event_id: any) {
    return new Promise(resolve => {
      this.http.delete(this.restapiService.ipAddress+"/cancel_event/"+user_id+"/"+event_id)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  joinEventPost(user_id: any, event_id: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
 
    var params = 'user_id='+user_id+'&'+'event_id='+event_id;

    return new Promise(resolve => {
      this.http.post(this.restapiService.ipAddress+"/join_events", params , {headers: headers})
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getAllEvents() {
    return new Promise(resolve => {
      // this.http.get("https://restful-api-dissertation.herokuapp.com/events")
      this.http.get(this.restapiService.ipAddress+"/events")
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          console.log(JSON.stringify(error.json()));
        });
    });
  }

  getEventsByCity(city_name: string){
    return new Promise(resolve => {
      this.http.get(this.restapiService.ipAddress+"/events/"+city_name)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          console.log(JSON.stringify(error.json()));
        });
    });
  }

  checkUsersInEvent(event_id: any) {
    return new Promise(resolve => {
      this.http.get(this.restapiService.ipAddress+"/users_events/"+event_id)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          console.log(JSON.stringify(error.json()));
        });
    });
  }

  checkEventInformation(event_id: any) {
    return new Promise(resolve => {
      this.http.get(this.restapiService.ipAddress+"/event/"+event_id)
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
      // this.http.get("https://restful-api-dissertation.herokuapp.com/my_events/"+user_id)
      this.http.get(this.restapiService.ipAddress+"/my_events/"+user_id)
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
      // this.http.get("https://restful-api-dissertation.herokuapp.com/upcoming_events/"+user_id)
      this.http.get(this.restapiService.ipAddress+"/upcoming_events/"+user_id)
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
