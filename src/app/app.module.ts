import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobPianoComponent } from './job-piano/job-piano.component';
import { ShowJobPianoComponent } from './job-piano/show-job-piano/show-job-piano.component';
import { AddEditJobPianoComponent } from './job-piano/add-edit-job-piano/add-edit-job-piano.component';

import{ SharedService } from './shared.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { JobItaliaComponent } from './job-italia/job-italia.component';
import { JobFilialiComponent } from './job-filiali/job-filiali.component';
import { AddEditJobItaliaComponent } from './job-italia/add-edit-job-italia/add-edit-job-italia.component';
import { ShowJobItaliaComponent } from './job-italia/show-job-italia/show-job-italia.component';
import { ShowJobFilialiComponent } from './job-filiali/show-job-filiali/show-job-filiali.component';
import { AddEditJobFilialiComponent } from './job-filiali/add-edit-job-filiali/add-edit-job-filiali.component';

@NgModule({
  declarations: [
    AppComponent,
    JobPianoComponent,
    ShowJobPianoComponent,
    AddEditJobPianoComponent,
    JobItaliaComponent,
    JobFilialiComponent,
    AddEditJobItaliaComponent,
    ShowJobItaliaComponent,
    ShowJobFilialiComponent,
    AddEditJobFilialiComponent    
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatRadioModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
