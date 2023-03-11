import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ResultsService {

    private subject = new Subject<any>();

    private onlyNumbers: Array<any> = [];
    private onlyChances: Array<any> = [];
    private occurences: Array<any> = [];
    private occurencesChance: Array<any> = [];

    constructor(private http: HttpClient) {
    }

    public fetchLotoData = () => {
        if (this.onlyNumbers.length === 0 && this.occurences.length === 0) {
            this.http.get('https://loto-api-v2.onrender.com/results').toPromise().then((result: any) => {
                result.forEach((element: any) => {
                    this.onlyNumbers.push(...element.numbers);
                });

                result.forEach((element: any) => {
                    this.onlyChances.push(element.chance);
                });
                this.occurences = this.onlyNumbers.reduce(function (acc, curr) {
                    return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
                }, {});
                this.occurencesChance = this.onlyChances.reduce(function (acc, curr) {
                    return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
                }, {});
                this.subject.next({ rawResult: result, occurences: this.occurences, occurencesChances: this.occurencesChance, numbers: this.onlyNumbers });
            })
        }
    }

    public getData(): Observable<any> {
        return this.subject.asObservable();
    }
}
