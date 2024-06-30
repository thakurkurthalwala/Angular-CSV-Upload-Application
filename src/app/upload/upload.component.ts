import { Component } from '@angular/core';
import { CsvService } from '../csv.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  selectedFile: File | null = null;
  errorMessage: string | null = null;

  constructor(
    private csvService: CsvService,
    private router: Router,
    private toastr:ToastrService
  ) {}

  onFileSelected(event: Event): void {debugger;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (fileExtension !== 'csv') {
        this.toastr.warning(fileExtension?.toUpperCase() +' Format not Accepted. Please upload a CSV file.', '', 
          { timeOut: 5000 });
        return;
      }

      this.selectedFile = file;
      localStorage.setItem('csvName', JSON.stringify(this.selectedFile.name));
      this.errorMessage = null; // Clear any previous error messages
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.csvService.uploadFile(this.selectedFile).subscribe({
        next: () => {
          this.errorMessage = null;
          this.toastr.success('Uploaded Successfully!', '', { timeOut: 5000 });
          // Navigate to the next page or show a success message
          this.router.navigate(['/preview']); // Adjust the route as needed
        },
        error: (err) => {
          this.errorMessage = err;
        }
      });
    } else {
      this.toastr.error('No file selected. Please select a CSV file to upload.!', '');
    }
  }
  onPreview(): void 
  {
    if (this.selectedFile) {
      this.csvService.previewFile(this.selectedFile).subscribe({
        next: () => {
          this.errorMessage = null;
          // Navigate to the next page or show a success message
          this.router.navigate(['/preview']); // Adjust the route as needed
        },
        error: (err) => {
          this.errorMessage = err;
        }
      });
  }
}
}