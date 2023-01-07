import { AfterViewInit, Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { ResultsService } from '../../services/results.service';


@Component({
  selector: 'app-perfect-grid',
  templateUrl: './perfect-grid.component.html',
  styleUrls: ['./perfect-grid.component.less']
})
export class PerfectGridComponent implements OnInit {

  public grid = [0, 0, 0, 0, 0];
  public orderedNumbers: any = [];
  public orderedChances: any = [];

  constructor(private _resultsService: ResultsService) { }

  ngOnInit(): void {
    this._resultsService.getData().subscribe( (data) => {
      this.orderedNumbers = this.sortProperties(data.occurences);
      this.orderedChances = this.sortProperties(data.occurencesChances);
    })
  }


  public sortProperties = (obj: any) =>  {
    // convert object into array
    var sortable=[];
    for(let key in obj)
      if(obj.hasOwnProperty(key))
        sortable.push([key, obj[key]]); // each item is an array in format [key, value]
    
    // sort items by value
    sortable.sort((a, b) =>
    {
      return a[1]-b[1]; // compare numbers
    });
    return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
  }
}
