import { Component, OnInit, ViewChild} from '@angular/core';
import { IonicPage, Events, NavController, NavParams, Searchbar} from 'ionic-angular';
import { Keyboard } from 'ionic-native';

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
  @ViewChild('searchBar') myInput: Searchbar;

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

  ngAfterViewInit() {
    setTimeout(() => {
      Keyboard.show() // for android
      this.myInput.setFocus();
    }, 1000);
  }
  
  chooseItem(item){
    let itemSelected = item;
    this.searchItem = item;
    let address = "";
    console.log("Item terms length: " + item["terms"].length);
    for(let i = 0; i<item["terms"].length; i++){
      if(item["terms"].length <= 2){
        address += item["terms"][i]["value"];
        break;
      }else {
        if(i==item["terms"].length-2){
          console.log("City: " + JSON.stringify(item["terms"][i]["value"]));
          this.loc = item["terms"][i]["value"];
          break;
        }else {
          address += item["terms"][i]["value"];
          if(i<item["terms"].length-3){
            address += ", ";
          }
        }
      }
    }
    console.log("Item: " + JSON.stringify(item));
    let data = 
    { 
      'location': address,
      'city': this.loc
    };
    this.events.publish('searchLocation', data);
    this.navCtrl.pop();
    console.log("ADDRESS: " + data["location"] + " " + data["city"]);
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
