import { Component, Injectable } from '@angular/core';
//  import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { CityPost } from './city-post';
import { Observable, of } from 'rxjs';

@Injectable()
export class CityService {
    private cityPosts: CityPost;

    // constructor(private cityName:string){
    //     // var path = 'http://localhost:4200/../formatted-jsons/' + cityName + '.json';
    //      var path = 'http://localhost:4200/assets/data.json'
    //     this.http.get(path)
    //         .subscribe(data => console.log(data));
    // }
    constructor(private http: HttpClient) {

    }

    getCityInfo(cityName:string) : Observable<CityPost[]> {
        var path = '../assets/formatted-jsons/' + cityName + '.json';
        // console.log(this.http.get<CityPost[]>(path)
        //     .subscribe(data => console.log(data)));
        console.log(path);
        return this.http.get<CityPost[]>(path);
    }
}