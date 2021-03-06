import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { RestapiserviceProvider } from '../restapiservice/restapiservice';

/*
  Generated class for the TabsServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TabsServiceProvider {
  data: any;

  constructor(public http: Http, public restapiService: RestapiserviceProvider) {
    console.log('Hello TabsServiceProvider Provider');

  }

  createEventPost(title: string, description: string, location: string, city: string, imgName: string, startdate: any, starttime: any, endtime: any, type: any, user_id: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
 
    var params = 'title='+title+'&'+'description='+description+'&'+'location='+location+'&'+'city='+city+'&'+'imgName='+imgName+'&'+'startdate='+startdate+'&'+'starttime='+starttime+'&'+'endtime='+endtime+'&'+'type='+type+'&'+'user_id='+user_id;

    return new Promise(resolve => {
      this.http.post(this.restapiService.ipAddress+"/create_events", params , {headers: headers})
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  cancelJoinEvent(user_id: any, event_id: any, owner_id: any) {
    return new Promise(resolve => {
      this.http.delete(this.restapiService.ipAddress+"/cancel_event/"+user_id+"/"+event_id+"/"+owner_id)
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

  getParticipants(event_id: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.restapiService.ipAddress+"/users_events/"+event_id)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          reject(false);
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
    return new Promise((resolve, reject) => {
      this.http.get(this.restapiService.ipAddress+"/users_events/"+event_id)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          console.log("ERROR CHECK USERS");
          reject(false);
        });
    });
  }

  checkEventInformation(event_id: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.restapiService.ipAddress+"/event/"+event_id)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          reject(false);
          console.log("ERROR CHECK EVENT INFO");
        });
    });
  }

  getMyEvents(user_id: any) {
    return new Promise(resolve => {
      this.http.get(this.restapiService.ipAddress+"/my_events/"+user_id)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          console.log("error getting events");
        });
    });
  }

  getUpcomingEvents(user_id: any) {
    return new Promise(resolve => {
      this.http.get(this.restapiService.ipAddress+"/upcoming_events/"+user_id)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          console.log("error getting upcoming events");
        });
    });
  }

  starPerson(user_id: any, star_person_id: any){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
 
    var params = 'user_id='+user_id+'&'+'star_person_id='+star_person_id;

    return new Promise(resolve => {
      this.http.post(this.restapiService.ipAddress+"/star", params , {headers: headers})
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  checkStars(user_id: any, person_id: any){
    return new Promise(resolve => {
      this.http.get(this.restapiService.ipAddress+"/star/"+user_id+"/"+person_id)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          console.log("error checking stars");
        });
    });
  }

  unstarPerson(user_id: any, star_person_id: any) {
    return new Promise(resolve => {
      this.http.delete(this.restapiService.ipAddress+"/unstar/"+user_id+"/"+star_person_id)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          console.log("error unstarring person");
        });
    });
  }

  getStarPeople(user_id: any){
    return new Promise(resolve => {
      this.http.get(this.restapiService.ipAddress+"/star_people/"+user_id)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          console.log("error getting stars");
        });
    });
  }

  getRecommendations(user_id: any) {
    return new Promise(resolve => {
      this.http.get(this.restapiService.ipAddress+"/recommendations/"+user_id)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          console.log("error getting recommendations");
        });
    });
  }

  getUserActivities(user_id: any) {
    return new Promise((resolve,reject) => {
      this.http.get(this.restapiService.ipAddress+"/activities/"+user_id)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          reject(false);
          console.log("ERROR CHECK USER ACTIVITIES");
        });
    });
  }

  saveUserActivities(user_id: any, event_id: any, event_title: string, type: string, date: string, time: string, timeCreated: number){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
 
    var params = 'user_id='+user_id+'&'+'event_id='+event_id+'&'+'event_title='+event_title+'&'+'type='+type+'&'+'date='+date+'&'+'time='+time+'&'+'timeCreated='+timeCreated;

    return new Promise(resolve => {
      this.http.post(this.restapiService.ipAddress+"/save_activity", params , {headers: headers})
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    });
  }


}
