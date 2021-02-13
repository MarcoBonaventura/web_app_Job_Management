import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SharedService {

  readonly APIUrl = "http://localhost:5000/api";

  constructor(private http:HttpClient) { }

  /** HTTP REQUEST JOB PIANO */
  getJobPianoList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/JobPiano');
  }

  addJobPiano(val:any){
    return this.http.post(this.APIUrl+'/JobPiano',val);
  }

  updateJobPiano(val:any){
    return this.http.put(this.APIUrl+'/JobPiano',val);
  }

  deleteJobPiano(val:any){
    return this.http.delete(this.APIUrl+'/JobPiano/'+val);
  }

  deleteMultiJobPiano(val:any){
    return this.http.post(this.APIUrl+'/JobPiano/DeleteMulti/',val);
  }

  getAllJobsPiano():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/JobPiano/GetAllJobsPiano');
  }

  getAllSuspendedPianoOpt():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/JobPiano/GetAllSuspendedPianoOpt');
  }

  getAllFridayPianoJobs():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/JobPiano/GetAllFridayPianoJobs');
  }
  
  getAllMacroPianoList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/JobPiano/GetAllMacroPianoList');
  }

  getAllPianoPages():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/JobPiano/GetAllPianoPages');
  }

  getJobsPianoByPage(val:any){
    return this.http.get(this.APIUrl+'/JobPiano/GetJobsPianoByPage/'+val);
  }




  /** HTTP REQUEST JOB ITALIA */
  getJobItaliaList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/JobItalia');
  }

  addJobItalia(val:any){
    return this.http.post(this.APIUrl+'/JobItalia',val);
  }

  updateJobItalia(val:any){
    return this.http.put(this.APIUrl+'/JobItalia',val);
  }

  deleteJobItalia(val:any){
    return this.http.delete(this.APIUrl+'/JobItalia/'+val);
  }

  getAllJobsItalia():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/JobItalia/GetAllJobsItalia');
  }

  getAllSuspendedItaliaOpt():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/JobItalia/GetAllSuspendedItaliaOpt');
  }

  getAllFridayItaliaJobs():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/JobItalia/GetAllFridayItaliaJobs');
  }
  
  getAllMacroItaliaList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/JobItalia/GetAllMacroItaliaList');
  }

  getAllItaliaPages():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/JobItalia/GetAllItaliaPages');
  }

  getJobsItaliaByPage(val:any){
    return this.http.get(this.APIUrl+'/JobItalia/GetJobsItaliaByPage/'+val);
  }



  /** HTTP REQUEST JOB FILIALI */
  getJobFilialiList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/JobFiliali');
  }

  addJobFiliali(val:any){
    return this.http.post(this.APIUrl+'/JobFiliali',val);
  }

  updateJobFiliali(val:any){
    return this.http.put(this.APIUrl+'/JobFiliali',val);
  }

  deleteJobFiliali(val:any){
    return this.http.delete(this.APIUrl+'/JobFiliali/'+val);
  }

  getAllJobsFiliali():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/JobFiliali/GetAllJobsFiliali');
  }

  getAllSuspendedFilialiOpt():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/JobFiliali/GetAllSuspendedFilialiOpt');
  }

  getAllFridayFilialiJobs():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/JobFiliali/GetAllFridayFilialiJobs');
  }
  
  getAllMacroFilialiList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/JobFiliali/GetAllMacroFilialiList');
  }

  getAllFilialiPages():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/JobFiliali/GetAllFilialiPages');
  }

  getJobsFilialiByPage(val:any){
    return this.http.get(this.APIUrl+'/JobItalia/GetJobsFilialiByPage/'+val);
  }



}




