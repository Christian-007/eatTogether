import { Component, OnInit} from '@angular/core';
import { IonicPage, Events, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the SearchLocationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search-location',
  templateUrl: 'search-location.html',
})
export class SearchLocationPage implements OnInit{
  loc: any;

  autocompleteItems: any;
  autocomplete: any;
  acService:any;
  placesService: any;
  searchItem: any;

  constructor(public navCtrl: NavController, public events: Events, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchLocationPage');
  }

  ngOnInit() {
    this.acService = new google.maps.places.AutocompleteService();        
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };        
  }
  
  chooseItem(item){
    let itemSelected = item;
    this.searchItem = item;
    console.log("Item terms length: " + item["terms"].length);
    for(let i = 0; i<item["terms"].length; i++){
      if(i==item["terms"].length-2){
        console.log("City: " + JSON.stringify(item["terms"][i]["value"]));
        this.loc = item["terms"][i]["value"];
      }
    }
    console.log("Item: " + JSON.stringify(item));
    let data = 
    { 
      'location': this.loc,
      'address': item["description"]
    };
    this.events.publish('searchLocation', data);
    this.navCtrl.pop();
  }

  updateSearch() {
    console.log('modal > updateSearch');
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let self = this; 
    let config = { 
      //types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
      input: this.autocomplete.query, 
      componentRestrictions: {  } 
    }
    this.acService.getPlacePredictions(config, function (predictions, status) {
      console.log('modal > getPlacePredictions > status > ', status);
      self.autocompleteItems = [];
      if(predictions!=null){
        predictions.forEach(function (prediction) {              
          self.autocompleteItems.push(prediction);
        });
      }
    });
  }

}
