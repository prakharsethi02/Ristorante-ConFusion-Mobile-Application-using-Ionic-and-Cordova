import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Leader } from '../../shared/leader';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/delay';
/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.*/

@Injectable()
export class LeaderProvider {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgProvider) { }

getLeaders(): Observable<Leader[]> {
return this.http.get<Leader[]>(baseURL + 'leaders')
.pipe(catchError(this.processHTTPMsgService.handleError));
}

getLeader(id: number): Observable<Leader> {
return this.http.get<Leader>(baseURL + 'leaders/' + id)
.pipe(catchError(this.processHTTPMsgService.handleError));
}

getFeaturedLeader(): Observable<Leader> {
return this.http.get<Leader[]>(baseURL + 'leaders?featured=true').pipe(map(leaders => leaders[0]))
.pipe(catchError(this.processHTTPMsgService.handleError));
}

}
