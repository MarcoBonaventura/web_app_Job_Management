import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-job-piano',
  templateUrl: './show-job-piano.component.html',
  styleUrls: ['./show-job-piano.component.css']
  //template: '<child-comp (closeModal)="refreshJobPianoList($event)"></child-comp>'
})

export class ShowJobPianoComponent implements OnInit {

  constructor(private service:SharedService) { }

  JobList:any = [];
  JobPageList:any = [];

  ModalTitle:string = "";
  ActivateAddEditJobPianoComp:boolean = false;
  jobpiano:any;
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
    this.refreshJobPianoList();
    this.GetPianoPages();
  }

  addClick(item:any){
    
    this.new_ID = item.JobID;
    this.new_prty = item.Prty + 1;

    this.jobpiano={
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
    this.ActivateAddEditJobPianoComp = true;
  }

  closeClick(){
    this.ActivateAddEditJobPianoComp = false;
    this.refreshJobPianoList();
  }

  editClick(item:any){
    this.ActivateAddEditJobPianoComp = true;
    console.log("editClick(item)",item);
    this.jobpiano = item;
    this.ModalTitle = "Edit Job";
  }

  deleteClick(item:any){
    if(confirm('Are you sure??')){
      this.service.deleteJobPiano(item.JobID).subscribe(data=>{
        alert(data.toString());
        this.refreshJobPianoList();
      })
    }
  }

  refreshJobPianoList(){
    this.service.getJobPianoList().subscribe(data=>{
      this.JobList = data;
      this.JobListWithoutFilter = data;
    });
  }

  GetPianoPages(){
    this.service.getAllPianoPages().subscribe(data=>{
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
