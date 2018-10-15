import { Component } from '@angular/core';

import {CityPost} from './city-post';
import {CityService} from './city.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Aussie Subreddit Topics';
  cityName;
  cityPosts: CityPost[];


  constructor( private cityService: CityService ){  }

  displayDetails(cityName: string): void {
    this.cityName = cityName;
    this.cityService.getCityInfo(cityName)
    .subscribe(cityPosts => this.cityPosts = cityPosts);

    console.log(this.cityPosts[0].title);
    //console.log(cityName);
  }


  // public jsonToInfo(cityName){
  //   let jsonData = JSON.parse(data);


    
  // }


}


