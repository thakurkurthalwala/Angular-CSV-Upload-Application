import { Component, OnInit } from '@angular/core';
import { CsvService } from '../csv.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  animations: [
    trigger('needleAnimation', [
      state('void', style({ transform: 'rotate(0deg)' })),
      transition('* => *', animate('1s ease-out'))
    ])
  ]
})
export class ResultComponent implements OnInit {
  correctRows: number = 0;
  incorrectRows: number = 0;
  totalerrors: number =0;
  needleEndX: number = 0;
  needleEndY: number= 0;
  needleAnimationState: string = '';

  constructor(private csvService: CsvService, private router: Router) {}

  ngOnInit(): void {
    const data = this.csvService.getData();
    const errors = this.csvService.getErrors();
    this.correctRows = data.filter((_, index) => this.csvService.isRowValid(index)).length;
    this.incorrectRows = data.length - this.correctRows;
    this.totalerrors = errors.length;
    this.updateNeedlePosition();
  }

 updateNeedlePosition(): void {
    const correctnessPercentage = this.calculateCorrectness();
    const angle = (correctnessPercentage / 100) * 360; // Calculate angle (0-180 degrees)

    // Calculate needle end coordinates
    this.needleEndX = 100 + 70 * Math.sin(angle * Math.PI / 360); // 70 is the radius for needle length
    this.needleEndY = 100 - 70 * Math.cos(angle * Math.PI / 360);

    // Trigger animation by changing state
    this.needleAnimationState = this.needleAnimationState === '' ? 'animate' : '';
  }
  calculateCorrectness(): number {
    if (this.correctRows === 0 && this.incorrectRows === 0) {
      return 0; // No data available
    }

    return (this.correctRows / (this.correctRows + this.incorrectRows)) * 100;
  }
  onUploadAnother(): void {
    this.router.navigate(['/upload']);
  }
}
