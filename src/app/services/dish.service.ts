import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Dish } from '../shared/dish';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient, private pocessHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.pocessHTTPMsgService.hanldeError));

  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' +id)
      .pipe(catchError(this.pocessHTTPMsgService.hanldeError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishees?featured=true')
      .pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.pocessHTTPMsgService.hanldeError));
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error => error));
  }


  // getDishes(): Observable<Dish[]> {
  //   return of(DISHES).pipe(delay(2000));

  // }
}

