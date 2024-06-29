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
  ngOnInit(): void {debugger;
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
}
