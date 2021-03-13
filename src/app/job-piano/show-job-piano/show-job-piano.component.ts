import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { LoaderService } from '../../services/loader.service';
import { HttpClient } from '@angular/common/http';

export interface Task {
  completed: boolean;
  jobID: number;
  Prty: number;
  subtasks?: Task[];
}

@Component({
  selector: 'app-show-job-piano',
  templateUrl: './show-job-piano.component.html',
  styleUrls: ['./show-job-piano.component.css']
})

export class ShowJobPianoComponent implements OnInit {

  constructor(public http: HttpClient, private service:SharedService, private loaderService:LoaderService) { 

    this.loaderService.isLoading.subscribe((v) => {
      this.display = v;
    });

  }

  display: boolean = false;

  JobList:any = [];
  MacroList:any = [];
  JobPageList:any = [];
  groupID:any = [];
  arrayJob:any = [];
  ID2delete:any = [];
  allComplete:boolean = false;
  color:String = "primary";

  ModalTitle:string = "";
  ActivateAddEditJobPianoComp:boolean = false;
  jobpiano:any;
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

  task: Task = {
    completed: false,
    jobID: 0,
    Prty: 0,
    subtasks:[{ completed: false, jobID: 0, Prty: 0 }]
  };

  

  ngOnInit(): void {
    this.refreshJobPianoList();
    this.GetPianoPages();
    this.getMacroList();
    this.populateGroupID();
  }



  // add-job
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

  // close modal pop-up
  closeClick(){
    this.ActivateAddEditJobPianoComp = false;
    this.refreshJobPianoList();
  }

  //edit job
  editClick(item:any){
    this.ActivateAddEditJobPianoComp = true;
    console.log("editClick(item)",item);
    this.jobpiano = item;
    this.ModalTitle = "Edit Job";
  }

  // single job remove
  deleteClick(item:any){
    console.log("deleting jobID: ",item.JobID);
    if(confirm('Are you sure??')){
      this.service.deleteJobPiano(item.JobID).subscribe(data=>{
        alert(data.toString());
        this.refreshJobPianoList();
      })
    }
  }

  // multi jobs remove from check-box selection
  deleteMany(){
    if(confirm('Delete selected jobs?')){
      this.service.deleteMultiJobPiano(this.ID2delete).subscribe(data=>{
        alert(data.toString());
        this.refreshJobPianoList();
      })
    }
    this.setAll(false);
  }

  refreshJobPianoList(){
    this.service.getJobPianoList().subscribe(data=>{
      this.JobList = data;
      this.JobListWithoutFilter = data;
      this.populateGroupID();
      this.makeHttpCall();
    });
  }

  makeHttpCall() {
    this.http.get('https://jsonplaceholder.typicode.com/comments').subscribe((r) => {
        console.log(r);
      });
  }

  getMacroList(){
    this.service.getAllMacroPianoList().subscribe((data:any)=>{
      this.MacroList = data;
    });
  }

  GetPianoPages(){
    this.service.getAllPianoPages().subscribe(data=>{
      this.JobPageList = data;
    });
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
