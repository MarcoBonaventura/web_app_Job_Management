import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobPianoComponent } from './job-piano/job-piano.component';
import { JobItaliaComponent } from './job-italia/job-italia.component';
import { JobFilialiComponent } from './job-filiali/job-filiali.component';


const routes: Routes = [
{ path:'job-piano',component:JobPianoComponent },
{ path:'job-italia',component:JobItaliaComponent },
{ path:'job-filiali',component:JobFilialiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
