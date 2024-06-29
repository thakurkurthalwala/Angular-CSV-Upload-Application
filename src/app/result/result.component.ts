import { Component, OnInit } from '@angular/core';
import { CsvService } from '../csv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  correctRows: number = 0;
  incorrectRows: number = 0;
  totalerrors: number =0;

  constructor(private csvService: CsvService, private router: Router) {}

  ngOnInit(): void {
    const data = this.csvService.getData();
    const errors = this.csvService.getErrors();
    this.correctRows = data.filter((_, index) => this.csvService.isRowValid(index)).length;
    this.incorrectRows = data.length - this.correctRows;
    this.totalerrors = errors.length;
  }

  onUploadAnother(): void {
    this.router.navigate(['/upload']);
  }
}
