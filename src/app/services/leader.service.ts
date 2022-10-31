import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {


  constructor(private http: HttpClient, private pocessHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leaders')
    .pipe(catchError(this.pocessHTTPMsgService.hanldeError));
  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leaders/' +id)
    .pipe(catchError(this.pocessHTTPMsgService.hanldeError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[  ]>(baseURL + 'leaders?featured=true')
    .pipe(map(leaders => leaders[0]))
    .pipe(catchError(this.pocessHTTPMsgService.hanldeError));
  }

}
