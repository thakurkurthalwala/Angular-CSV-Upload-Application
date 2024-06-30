import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  data: any[] = [];
  errors: any[] = [];
  constructor(private router: Router) {}
  ngOnInit(): void {
    const storedData = localStorage.getItem('csvData');
    const storedErrors = localStorage.getItem('csvErrors');

    if (storedData) {
      this.data = JSON.parse(storedData);
    }

    if (storedErrors) {
      this.errors = JSON.parse(storedErrors);
    }
  }
  onResult(): void {
    if (this.data) {
      console.log('Preview file:', this.data);
      this.router.navigate(['/result']);
    }
  }
  calculateCorrectness(): number {
    // Replace with your logic to calculate correctness (e.g., percentage)
    if (this.data.length === 0) {
      return 0; // No data, progress bar should show 0%
    }

    // Example: Calculate based on errors count or data validation status
    const totalRows = this.data.length;
    const errorCount = this.errors.length;

    const correctnessPercentage = ((totalRows - errorCount) / totalRows) * 100;
    
    return Math.round(correctnessPercentage);
  }
}
