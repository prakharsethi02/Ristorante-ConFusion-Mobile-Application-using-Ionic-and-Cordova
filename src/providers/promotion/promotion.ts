import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Promotion } from '../../shared/promotion';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/delay';
import { map } from 'rxjs/operators';
/*
  Generated class for the PromotionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PromotionProvider {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgProvider) { }

getPromotions(): Observable<Promotion[]> {
return this.http.get<Promotion[]>(baseURL + 'promotions')
.pipe(catchError(this.processHTTPMsgService.handleError));
}

getPromotion(id: number): Observable<Promotion> {
return this.http.get<Promotion>(baseURL + 'promotions/' + id)
.pipe(catchError(this.processHTTPMsgService.handleError));
}

getFeaturedPromotion(): Observable<Promotion> {
return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]))
.pipe(catchError(this.processHTTPMsgService.handleError));
}

}
