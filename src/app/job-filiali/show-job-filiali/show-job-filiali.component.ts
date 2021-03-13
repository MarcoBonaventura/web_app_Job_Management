import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { LoaderService } from '../../services/loader.service';
import { HttpClient } from '@angular/common/http';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Task {
  completed: boolean;
  jobID: number;
  Prty: number;
  subtasks?: Task[];
}

export interface JobSourceList {
  JobID: number;
  Prty: number;
  Macro: string,
  JobName: string;
  Lib: number;
  Suspended: string;
  Friday2X: string;
  Params: string;
  Descr: string;
  JobPage: string;
}

@Component({
  selector: 'app-show-job-filiali',
  templateUrl: './show-job-filiali.component.html',
  styleUrls: ['./show-job-filiali.component.css']
})
export class ShowJobFilialiComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public http: HttpClient, private service:SharedService, private loaderService:LoaderService) {
    this.loaderService.isLoading.subscribe((v) => {
      this.display = v;
    });
   }

  displayedColumns: string[] = ['Select', 'Macro', 'JobName', 'Library', 'Suspended', 'Friday2X', 'JobPage', 'Options'];
  display: boolean = false;
  dataSource:any;

  JobList:any = [];
  MacroList:any = [];
  JobPageList:any = [];
  groupID:any = [];
  arrayJob:any = [];
  ID2delete:any = [];
  allComplete:boolean = false;
  color:String = "primary";

  ModalTitle:string = "";
  ActivateAddEditJobFilialiComp:boolean = false;
  jobfiliali:any;
  new_ID:any = 0;
  new_prty:any = 0;

  tempID:any = 0;
  tempPrty:any = 0;
  listID:any = [];
  bulk_ID:any = [];
  
  Macro:any = "";
  JobIdFilter:string = "";
  JobNameFilter:string = "";
  JobPageFilter:string = "";
  JobListWithoutFilter:any = [];
  JobPageWithoutFilter:any = [];
  newPageFilter:any = "";
  jobMacroFilter:any = "";

  pageIndex:number = 0;
  pageSize:number = 25;
  lowValue:number = 0;
  highValue:number = 25; 

  task: Task = {
    completed: false,
    jobID: 0,
    Prty: 0,
    subtasks:[{ completed: false, jobID: 0, Prty: 0 }]
  };

  ngOnInit(): void {
    this.refreshJobFilialiList();
    this.GetFilialiPages();
    this.getMacroList();
    this.populateGroupID();
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

  deleteMany(){
    if(confirm('Delete selected jobs?')){
      this.service.deleteMultiJobFiliali(this.ID2delete).subscribe(data=>{
        alert(data.toString());
        this.refreshJobFilialiList();
      })
    }
    this.setAll(false);
  }

  refreshJobFilialiList(){
    this.service.getJobFilialiList().subscribe(data=>{
      this.JobList = data;
      this.JobListWithoutFilter = data;
      this.populateGroupID();
      this.makeHttpCall();
      this.refreshDataSource();
    });
  }


  refreshDataSource(){
    const ELEMENT_DATA: JobSourceList[] = this.JobList;
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.JobList.paginator = this.paginator;
    this.dataSource.paginator = this.paginator;
    console.log("data source: ", ELEMENT_DATA);
  }

  makeHttpCall() {
    this.http.get('https://jsonplaceholder.typicode.com/comments').subscribe((r) => {
        console.log(r);
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

  getPaginatorData(event){
    console.log(event);
    if(event.pageIndex === this.pageIndex + 1){
       this.lowValue = this.lowValue + this.pageSize;
       this.highValue =  this.highValue + this.pageSize;
      }
   else if(event.pageIndex === this.pageIndex - 1){
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue =  this.highValue - this.pageSize;
     }   
      this.pageIndex = event.pageIndex;
  } 

  /** FILTERS SECTION */

  FilterFn(){
    var JobIdFilter = this.JobIdFilter;
    var JobNameFilter = this.JobNameFilter;

    this.JobList = this.JobListWithoutFilter.filter(function (el:any){
        return el.JobID.toString().toLowerCase().includes(JobIdFilter.toString().trim().toLowerCase())&&
        el.JobName.toString().toLowerCase().includes(JobNameFilter.toString().trim().toLowerCase())
    });
    
    this.task.subtasks?.splice(0,this.task.subtasks.length);
    this.JobList.forEach((element: any) => {
      this.task.subtasks?.push({completed: true, jobID: element.JobID, Prty: element.Prty});
    });
    this.refreshTask();
  }

  FilterPg(){
    var JobIdFilter = this.JobIdFilter;
    var JobPageFilter = this.JobPageFilter;

    this.JobList = this.JobListWithoutFilter.filter(function (el:any){
        return el.JobID.toString().toLowerCase().includes(JobIdFilter.toString().trim().toLowerCase())&&
        el.JobPage.toString().toLowerCase().includes(JobPageFilter.toString().trim().toLowerCase())
    });
    this.refreshTask();
  }

  SwapMacro(){
    this.setAll(false);

    var JobIdFilter = this.JobIdFilter;
    var jobMacroFilter = this.jobMacroFilter;

    this.JobList = this.JobListWithoutFilter.filter(function (el:any){
      return el.JobID.toString().toUpperCase().includes(JobIdFilter.toString().trim().toUpperCase())&&
      el.Macro.toString().toUpperCase().includes(jobMacroFilter.toString().trim().toUpperCase())
    });

    this.populateGroupID();
  }

  SwapPage(){
    var JobIdFilter = this.JobIdFilter;
    var newPageFilter = this.newPageFilter;
   
    this.JobList = this.JobListWithoutFilter.filter(function (el:any){
      return el.JobID.toString().toLowerCase().includes(JobIdFilter.toString().trim().toLowerCase())&&
      el.JobPage.toString().toLowerCase().includes(newPageFilter.toString().trim().toLowerCase())
    });
    this.refreshTask();
    this.task.subtasks?.splice(0, this.task.subtasks.length)
    this.populateGroupID();
    this.task.subtasks?.splice(0, 0, {completed: false, jobID: 0, Prty: 0});
  }
  // END FILTERS SECTION



  populateGroupID(){
    var i:any = 0;
    this.groupID.length = 0;
    this.JobList.forEach((element: any) => {
      this.groupID[i] = element.JobID;
      this.task.subtasks?.push({completed: false, jobID: element.JobID, Prty: element.Prty});
      i++;
    });
    this.getID2delete();
    console.log("groupID refreshed >> ",this.task)
  }


  // select every check-box
  setAll(completed: boolean) {
    this.ID2delete.length = 0;
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
    if (!completed) {
      this.ID2delete.length = 0;
      }
    this.getID2delete();
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  // single check-box selection
  updateAllComplete(index: any, _prty: any) {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    
    console.log("updateAllComplete() ");
    console.log("index: ",index," - Prty: ",_prty);
    console.log("task: ",this.task);
    var i = 0;
    this.task.subtasks?.forEach((element: any) => {
      if (_prty == element.Prty) {
        if (element.completed == true) {
          console.log("true: push ID: ",element.jobID," prty: ",element.Prty);
          
          // add job to deleting list
          this.ID2delete.push({jobID: element.jobID, Prty: element.Prty});
        }
        else {
          console.log("false: delete prty: ",element.Prty);
          var scan = _prty;
          console.log("removing array with prty: ",scan);
          var ind = this.ID2delete.findIndex(function(item: any, i: any){
            return item.Prty === scan
          });
          
          // remove selected job from deleting list
          this.ID2delete.splice(ind, 1);
        }
      }
      i++;
    });
    
    this.ID2delete = this.sortByKey(this.ID2delete, "Prty");
    console.log("single ID2delete: ",this.ID2delete);
  }

  // sort json array by PRTY key
  sortByKey(array:any, key:any) {
    return array.sort(function(a:any, b:any)
    {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  refreshTask(){
    this.task.subtasks?.splice(0,this.task.subtasks.length);
    this.JobList.forEach((element: any) => {
      this.task.subtasks?.push({completed: false, jobID: element.JobID, Prty: element.Prty});
    });
  }

  getID2delete(){
    this.ID2delete.length = 0;
    this.task.subtasks?.forEach((element: any) => {
      if (element.completed == true) {
        this.ID2delete.push({jobID: element.jobID, Prty: element.Prty});
      }
    });
    console.log("ID2delete: ",this.ID2delete);
  }

}
