import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../services/results.service';


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
      this.grids = data.rawResult.data;
    })
  }

}
