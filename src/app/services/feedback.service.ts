import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Feedback } from '../shared/feedback';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient, private pocessHTTPMsgService: ProcessHTTPMsgService) { }

  submitFeedback(feedback: Feedback) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<Feedback>(baseURL + 'feedback', feedback, httpOptions)
      .pipe(catchError(this.pocessHTTPMsgService.hanldeError));
  }
}
