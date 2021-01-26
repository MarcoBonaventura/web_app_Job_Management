import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-job-italia',
  templateUrl: './show-job-italia.component.html',
  styleUrls: ['./show-job-italia.component.css']
})
export class ShowJobItaliaComponent implements OnInit {

  constructor(private service:SharedService) { }

  JobList:any = [];
  JobPageList:any = [];

  ModalTitle:string = "";
  ActivateAddEditJobItaliaComp:boolean = false;
  jobitalia:any;
  new_ID:any = 0;
  new_prty:any = 0;

  Macro:any = "";
  JobIdFilter:string = "";
  JobNameFilter:string = "";
  JobPageFilter:string = "";
  JobListWithoutFilter:any = [];
  JobPageWithoutFilter:any = [];
  newPageFilter:any = "";

  ngOnInit(): void {
    this.refreshJobItaliaList();
    this.GetItaliaPages();
  }

  addClick(item:any){
    
    this.new_ID = item.JobID;
    this.new_prty = item.Prty + 1;

    this.jobitalia={
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
    this.ActivateAddEditJobItaliaComp = true;
  }

  closeClick(){
    this.ActivateAddEditJobItaliaComp = false;
    this.refreshJobItaliaList();
  }

  editClick(item:any){
    this.ActivateAddEditJobItaliaComp = true;
    console.log("editClick(item)",item);
    this.jobitalia = item;
    this.ModalTitle = "Edit Job";
  }

  deleteClick(item:any){
    if(confirm('Are you sure??')){
      this.service.deleteJobItalia(item.JobID).subscribe(data=>{
        alert(data.toString());
        this.refreshJobItaliaList();
      })
    }
  }

  refreshJobItaliaList(){
    this.service.getJobItaliaList().subscribe(data=>{
      this.JobList = data;
      this.JobListWithoutFilter = data;
    });
  }

  GetItaliaPages(){
    this.service.getAllItaliaPages().subscribe(data=>{
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

}
