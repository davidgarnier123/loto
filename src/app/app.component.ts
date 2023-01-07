import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'loto';
  public dataIsReady = false;

  @ViewChild('tabs', {static: false}) tabs: any;

  constructor (private _resultsService: ResultsService) {

  }

  ngOnInit() {
    this._resultsService.fetchLotoData();
    this._resultsService.getData().subscribe( () => {
      this.dataIsReady = true;
      this.tabs.realignInkBar();
    })
  }

}
