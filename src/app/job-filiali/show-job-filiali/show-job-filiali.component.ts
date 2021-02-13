import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-job-filiali',
  templateUrl: './show-job-filiali.component.html',
  styleUrls: ['./show-job-filiali.component.css']
})
export class ShowJobFilialiComponent implements OnInit {

  constructor(private service:SharedService) { }

  JobList:any = [];
  JobPageList:any = [];
  MacroList:any = [];

  ModalTitle:string = "";
  ActivateAddEditJobFilialiComp:boolean = false;
  jobfiliali:any;
  new_ID:any = 0;
  new_prty:any = 0;

  Macro:any = "";
  JobIdFilter:string = "";
  JobNameFilter:string = "";
  JobPageFilter:string = "";
  JobListWithoutFilter:any = [];
  JobPageWithoutFilter:any = [];
  newPageFilter:any = "";
  jobMacroFilter:any = "";

  ngOnInit(): void {
    this.refreshJobFilialiList();
    this.GetFilialiPages();
    this.getMacroList();
  }

  addClick(item:any){
    
    this.new_ID = item.JobID;
    this.new_prty = item.Prty + 1;

    this.jobfiliali={
      JobID:0,
      Lib:0,
      Macro:"",
      Suspended:"no",
      Friday2X:"no",
      JobName:"",
      JobPage:"",
      Prty:this.new_prty
    }
    this.ModalTitle="Add Job";
    this.ActivateAddEditJobFilialiComp = true;
  }

  closeClick(){
    this.ActivateAddEditJobFilialiComp = false;
    this.refreshJobFilialiList();
  }

  editClick(item:any){
    this.ActivateAddEditJobFilialiComp = true;
    console.log("editClick(item)",item);
    this.jobfiliali = item;
    this.ModalTitle = "Edit Job";
  }

  deleteClick(item:any){
    if(confirm('Are you sure??')){
      this.service.deleteJobFiliali(item.JobID).subscribe(data=>{
        alert(data.toString());
        this.refreshJobFilialiList();
      })
    }
  }

  refreshJobFilialiList(){
    this.service.getJobFilialiList().subscribe(data=>{
      this.JobList = data;
      this.JobListWithoutFilter = data;
    });
  }

  getMacroList(){
    this.service.getAllMacroFilialiList().subscribe((data:any)=>{
      this.MacroList = data;
      console.log("MacroList: ",this.MacroList);
    });
  }

  GetFilialiPages(){
    this.service.getAllFilialiPages().subscribe(data=>{
      this.JobPageList = data;
    });
  }

  FilterFn(){
    var JobIdFilter = this.JobIdFilter;
    var JobNameFilter = this.JobNameFilter;

    this.JobList = this.JobListWithoutFilter.filter(function (el:any){
        return el.JobID.toString().toLowerCase().includes(JobIdFilter.toString().trim().toLowerCase())&&
        el.JobName.toString().toLowerCase().includes(JobNameFilter.toString().trim().toLowerCase())
    });
  }

  FilterPg(){
    var JobIdFilter = this.JobIdFilter;
    var JobPageFilter = this.JobPageFilter;

    this.JobList = this.JobListWithoutFilter.filter(function (el:any){
        return el.JobID.toString().toLowerCase().includes(JobIdFilter.toString().trim().toLowerCase())&&
        el.JobPage.toString().toLowerCase().includes(JobPageFilter.toString().trim().toLowerCase())
    });
  }

  SwapPage(){
    var JobIdFilter = this.JobIdFilter;
    var newPageFilter = this.newPageFilter;
   
    this.JobList = this.JobListWithoutFilter.filter(function (el:any){
      return el.JobID.toString().toLowerCase().includes(JobIdFilter.toString().trim().toLowerCase())&&
      el.JobPage.toString().toLowerCase().includes(newPageFilter.toString().trim().toLowerCase())
    });
  }

  SwapMacro(){
    var JobIdFilter = this.JobIdFilter;
    var jobMacroFilter = this.jobMacroFilter;
    
    this.JobList = this.JobListWithoutFilter.filter(function (el:any){
      return el.JobID.toString().toUpperCase().includes(JobIdFilter.toString().trim().toUpperCase())&&
      el.Macro.toString().toUpperCase().includes(jobMacroFilter.toString().trim().toUpperCase())
    });
    //this.refreshTask();
  }

}
