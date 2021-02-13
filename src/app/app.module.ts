import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobPianoComponent } from './job-piano/job-piano.component';
import { ShowJobPianoComponent } from './job-piano/show-job-piano/show-job-piano.component';
import { AddEditJobPianoComponent } from './job-piano/add-edit-job-piano/add-edit-job-piano.component';

import{ SharedService } from './shared.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { JobItaliaComponent } from './job-italia/job-italia.component';
import { JobFilialiComponent } from './job-filiali/job-filiali.component';
import { AddEditJobItaliaComponent } from './job-italia/add-edit-job-italia/add-edit-job-italia.component';
import { ShowJobItaliaComponent } from './job-italia/show-job-italia/show-job-italia.component';
import { ShowJobFilialiComponent } from './job-filiali/show-job-filiali/show-job-filiali.component';
import { AddEditJobFilialiComponent } from './job-filiali/add-edit-job-filiali/add-edit-job-filiali.component';

import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './interceptors/loader-interceptors.service';

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
    MatRadioModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [SharedService, LoaderService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
