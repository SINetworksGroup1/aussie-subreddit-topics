import { Component, OnInit } from '@angular/core';

import { City } from './city';
import { CityID } from './city';
import { CityService } from './city.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Aussie Subreddit Topics';
  generalDiscussion;
  transport;
  nature;
  history;
  other;
  questions;
  food;
  photos;
  news;
  entertainment;
  education;
  memes;
  total;


  cityName;

  //using service
  cities: City[] = [];
  cityIDs: CityID[] =   [
    {"id":0,
    "name":'adelaide'},
    {"id":1,
    "name":'brisbane'},
    {"id":2,
    "name":'canberra'},
    {"id":3,
    "name":'darwin'},
    {"id":4,
    "name":'hobart'},
    {"id":5,
    "name":'melbourne'},
    {"id":6,
    "name":'perth'},
    {"id":7,
    "name":'sydney'}
  ]


  public pieChartLabels:string[] = [ 'General Discussion','Transport', 'Nature', 
    'History', 'Other', 'Questions', 'Food', 'Photos', 'News', 'Entertainment',
    'Education', 'Memes']
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';
  public pieColors=[
    {
    backgroundColor: [
    'rgba(86, 226, 207, 1)',
    'rgba(86, 174, 226, 1)',
    'rgba(86, 104, 226, 1)',
    'rgba(138, 86, 226, 1)',
    'rgba(207, 86, 226, 1)',
    'rgba(226, 86, 174, 1)',
    'rgba(226, 86, 104, 1)',
    'rgba(226, 137, 86, 1)',
    'rgba(226, 207, 86, 1)',
    'rgba(174, 226, 86, 1)',
    'rgba(104, 226, 86, 1)',
    'rgba(86, 226, 137, 1)'
    ]
    }
    ];
    public pieChartOptions: any = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'left',
        labels: {
          fontSize: 18,
          fontColor: 'black'
        }
      }
  };


  constructor(private cityService: CityService) { }

  ngOnInit() {
    // let someArray = [1, "string", false];
    // let count = 0;
    // for (let cityName of this.cityNames) {
    //   console.log(cityName);
    //   console.log(count);

    //   this.cityService.getCityInfo(cityName)
    //     .subscribe(city => this.cities[count] = city);
    //   count++;
    // }


    this.cityService.getCityInfo('adelaide')
      .subscribe(city => this.cities[0] = city);
    this.cityService.getCityInfo('brisbane')
      .subscribe(city => this.cities[1] = city);
    this.cityService.getCityInfo('canberra')
      .subscribe(city => this.cities[2] = city);
    this.cityService.getCityInfo('darwin')
      .subscribe(city => this.cities[3] = city);
    this.cityService.getCityInfo('hobart')
      .subscribe(city => this.cities[4] = city);
    this.cityService.getCityInfo('melbourne')
      .subscribe(city => this.cities[5] = city);
    this.cityService.getCityInfo('perth')
      .subscribe(city => this.cities[6] = city);
    this.cityService.getCityInfo('sydney')
      .subscribe(city => this.cities[7] = city);


  }


  displayDetails(cityName: string): void {
    this.cityName = cityName;
    // this.cityService.getCityInfo(cityName.toLowerCase())
    // .subscribe(city => this.city = city);
    for (let city of this.cityIDs) {
      if(city.name == cityName.toLowerCase()){
        this.generalDiscussion =  this.cities[city.id].generalDiscussion;
        this.transport =  this.cities[city.id].transport;
        this.nature =  this.cities[city.id].nature;
        this.history =  this.cities[city.id].history;
        this.other =  this.cities[city.id].other;
        this.questions =  this.cities[city.id].questions;
        this.food =  this.cities[city.id].food;
        this.photos =  this.cities[city.id].photos;
        this.news =  this.cities[city.id].news;
        this.entertainment =  this.cities[city.id].entertainment;
        this.education =  this.cities[city.id].education;
        this.memes =  this.cities[city.id].memes;
        this.total =  this.cities[city.id].total;
        this.graph(this.cities[city.id]);
        break;
      }
    }
    // console.log(this.cities);
    //console.log(cityName);
  }


  graph(city: City){
   this.pieChartData = [this.generalDiscussion, this.transport, 
    this.nature, this.history, this.other, this.questions, this.food, 
    this.photos, this.news, this.entertainment, this.education, this.memes];
  }





  // public jsonToInfo(cityName){
  //   let jsonData = JSON.parse(data);



  // }


}


