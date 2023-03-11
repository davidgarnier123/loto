import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import * as moment from 'moment';

@Component({
  selector: 'app-results-grid',
  templateUrl: './results-grid.component.html',
  styleUrls: ['./results-grid.component.less']
})
export class ResultsGridComponent implements OnInit {

  public grids: Array<{numbers:Array<any>, chance:string, date: string }> = [];
  constructor(private _resultsService: ResultsService) { }

  ngOnInit(): void {
    this._resultsService.getData().subscribe( (data: any) => {
      this.grids = data.rawResult;
    })
  }

  public transformDate(date: any): string {
    date = moment.unix(date); // Convertir le timestamp en objet Moment
    return date.locale('fr').format('DD MMMM YYYY'); // Formater la date en français
  }

}
