import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-random-grid',
  templateUrl: './random-grid.component.html',
  styleUrls: ['./random-grid.component.less']
})
export class RandomGridComponent implements OnInit {

  public grid = [0, 0, 0, 0, 0];
  public chance = 0;
  private grids = [];

  public alreadyWon: any = [];

  constructor(private _resultsService: ResultsService) { }

  ngOnInit(): void {
    this._resultsService.getData().subscribe( (data) => {
      this.grids = data.rawResult.data;
      this.grids.forEach( (element: any) => {
        element.numbers = element.numbers.map( (i:string) =>Number(i))
        element.chance = Number(element.chance);
      });
    })
  }

  public generateGrid = () => {
    this.alreadyWon = [];
    let i = 0 ; 
      let interval = setInterval( () => {
        this.grid[0] = this.randomNumber(1, 50);
        this.grid[1] = this.randomNumber(1, 50);
        this.grid[2] = this.randomNumber(1, 50);
        this.grid[3] = this.randomNumber(1, 50);
        this.grid[4] = this.randomNumber(1, 50);
        this.chance = this.randomNumber(1, 11);

        // won grid
        // this.grid[0] = 12;
        // this.grid[1] = 14;
        // this.grid[2] = 26;
        // this.grid[3] = 29;
        // this.grid[4] = 39;
        // this.chance = 10;

        i++;
        if (i === 10) {
          clearInterval(interval);
          this.checkIfGridIsAlreadyWon();
        }
      }, 100);

  }

  private checkIfGridIsAlreadyWon = () => {
    this.grids.forEach( (grid: any) => {
      if(this.grid.every( (r: any) => grid.numbers.includes(r)) && this.chance === grid.chance){
        console.log('Found all of', this.grid, 'in', grid);
        this.alreadyWon.push(grid);
      }
    });
  }

  private randomNumber = (min: number, max: number) => { 
    return Math.floor(Math.random() * (max - min) + min);
  }

}
