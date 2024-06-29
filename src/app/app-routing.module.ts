import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { PreviewComponent } from './preview/preview.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {path:'',redirectTo:'/upload',pathMatch:'full'},
  {path:'upload',component: UploadComponent},
  { path: 'preview',component: PreviewComponent},
  {path: 'result', component: ResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
