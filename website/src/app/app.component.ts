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

  info;
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
      },
      hover: {
        onHover: (event, active) => {
          
          if(active && active.length){
            // console.log(event);
          // console.log(active);
            let index = active[0]._index;
            let str = active[0]._chart.config.data.labels[index].toString();
            let data = active[0]._chart.config.data.datasets[0].data[index].toString();
            
            // if(str.search('%') == -1){
            //   active[0]._chart.config.data.labels[index] = active[0]._chart.config.data.labels[index] + '%';
            // }
            this.info = data + '% of posts in the ' + this.cityName + ' subreddit are ' +str ;
            console.log(this.info);
          }
        }
      }
    };

  public barChartLabels:string[] = [ 'Questions', 'Non-Questions'];
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      labels: {
        fontSize: 18,
        fontColor: 'black'
      }},
    scales : {
      yAxes: [{
         ticks: {
            beginAtZero: true,
            steps : 10,
            stepValue : 10,
            max : 100,
          }
      }] 
    }
   };

  public barColors=[
    {
    backgroundColor: [
      'rgba(226, 86, 174, 0.9)',
      'rgba(255, 255, 255, 0.6)'
    ]
  }];
    
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [{}];


  constructor(private cityService: CityService) { }

  ngOnInit() {

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
    this.info = "";
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
        this.graph2(this.cities[city.id]);
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


  graph2(city:City){
    let nonquestions:number = (100 - this.questions);
    this.barChartData = [
    {data: [this.questions, nonquestions], label:'Questions'},
    ]
    console.log(this.barChartData);
    console.log(this.barChartLegend);
    console.log(this.barChartOptions);
    console.log(this.barChartType);
    
    
  }

  public chartClicked(e:any):void {
    console.log(e);
    
    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
      if ( activePoints.length > 0) {
        // get the internal index of slice in pie chart
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        // get value by index
        const value = chart.data.datasets[0].data[clickedElementIndex];
        console.log(clickedElementIndex, label, value)
      }
    }

  }
 
  public chartHovered(e:any):void {
    // console.log(e);
  }


}


