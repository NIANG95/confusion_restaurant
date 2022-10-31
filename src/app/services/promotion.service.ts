import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient, private pocessHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
      .pipe(catchError(this.pocessHTTPMsgService.hanldeError));

  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
      .pipe(catchError(this.pocessHTTPMsgService.hanldeError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true')
      .pipe(map(promotions => promotions[0]))
      .pipe(catchError(this.pocessHTTPMsgService.hanldeError));
  }
}
