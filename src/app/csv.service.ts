import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as Papa from 'papaparse';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class CsvService {
  data: any[] = [];
  errors: any[] = [];

  constructor(    
    private toastr:ToastrService
  ) {}

  uploadFile(file: File): Observable<void> {
    return new Observable((observer) => {
      Papa.parse(file, {
        complete: (result) => {
          this.data = result.data;
          this.errors = this.validateData(this.data);
          localStorage.setItem('csvData', JSON.stringify(this.data));
          localStorage.setItem('csvErrors', JSON.stringify(this.errors));
          if (this.errors.length > 0) {
            observer.error('Validation errors found in row');
            this.toastr.error('Validation errors found. Please Preview a CSV file weather it correct.!', '');
          }
          else if (this.errors.length > 1) {
            observer.error('Validation errors found in rows');
            this.toastr.error('Validation errors found. Please Preview a CSV file weather it correct.!', '');
          }
          else {
            observer.next();
          }
          observer.complete();
        },
        header: true,
        skipEmptyLines: true
      });
    });
  }

  validateData(data: any[]): any[] {
    const errors: any[] = [];
    data.forEach((row, rowIndex) => {
      Object.keys(row).forEach((col) => {
        if (!row[col]) {
          errors.push({ row: rowIndex + 1, column: col, error: 'Empty value' });
        } else {debugger;
          switch (col) {
            case 'Email':
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row[col])) {
                errors.push({ row: rowIndex + 1, column: col, error: 'Invalid email' });
              }
              break;
            case 'Phone':
              if (!/^\d{10}$/.test(row[col])) {
                errors.push({ row: rowIndex + 1, column: col, error: 'Invalid phone number' });
              }
              break;
            case 'GPA':
              if (isNaN(row[col]) || parseFloat(row[col]) < 0 || parseFloat(row[col]) > 10) {
                errors.push({ row: rowIndex + 1, column: col, error: 'Invalid GPA' });
              }
              break;
            default:
              break;
          }
        }
      });
    });
    return errors;
  }

  getData(): any[] {
    return this.data;
  }

  getErrors(): any[] {
    return this.errors;
  }
  previewFile(file: File): Observable<void> {debugger;
    return new Observable((observer) => {
      Papa.parse(file, {
        complete: (result) => {
          this.data = result.data;
          this.errors = this.validateData(this.data);
          localStorage.setItem('csvData', JSON.stringify(this.data));
          localStorage.setItem('csvErrors', JSON.stringify(this.errors));
          observer.next();
          observer.complete();
        },
        header: true,
        skipEmptyLines: true
      });
    });
  }

  isRowValid(rowIndex: number): boolean {
    return !this.errors.some(error => error.row === rowIndex + 1);
  }
}
