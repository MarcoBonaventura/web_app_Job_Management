import { Component, OnInit, Input } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-job-filiali',
  templateUrl: './add-edit-job-filiali.component.html',
  styleUrls: ['./add-edit-job-filiali.component.css']
})
export class AddEditJobFilialiComponent implements OnInit {

  constructor(private service:SharedService) {}

  @Input() jobfiliali:any;

  JobID:string = "";
  Prty:string = "";
  JobName:string = "";
  Macro:string = "";
  Lib:string = "";
  Suspended:string = "";
  Friday2X:string = "";
  JobPage:string = "";
  Descr:string = "";
  Params:string = "";
 
  JobsFilialiList:any = [];
  JobMacroList:any = [];
  SuspendedOpt:any = [];
  FridayJobs:any = [];
  FilialiPages:any = [];
 
  ngOnInit(): void {
    this.loadJobList();
    this.getMacroList();
    this.getAllSuspendedOpt();
    this.getAllFridayJobs();
    this.getAllFilialiPages();
  }
   
  loadJobList(){
    this.service.getAllJobsPiano().subscribe((data:any)=>{
      this.JobsFilialiList = data;
      this.JobID = this.jobfiliali.JobID;
      this.Prty = this.jobfiliali.Prty;
      this.JobName = this.jobfiliali.JobName;
      this.Macro = this.jobfiliali.Macro;
      this.Lib = this.jobfiliali.Lib;
      this.Suspended = this.jobfiliali.Suspended;
      this.Friday2X = this.jobfiliali.Friday2X;
      this.JobPage = this.jobfiliali.JobPage;
      this.Descr = this.jobfiliali.Descr;
      this.Params = this.jobfiliali.Params;
    });
    
    console.log("loadJobList()");
  }

  addJob(){
    var val = { JobID:this.JobID,
                JobName:this.JobName,
                Prty:this.Prty,
                Macro:this.Macro,
                Lib:this.Lib,
                Friday2X:this.Friday2X,
                Suspended:this.Suspended,
                JobPage:this.JobPage,
                Descr:this.Descr,
                Params:this.Params
              };
              
    this.service.addJobFiliali(val).subscribe(res=>{alert(res.toString());
    });

    console.log("add job: ", val);

  }
  
  updateJob(){

    var val = { JobID:this.JobID,
                Prty:this.Prty,
                JobName:this.JobName,
                Macro:this.Macro,
                Lib:this.Lib,
                Friday2X:this.Friday2X,
                Suspended:this.Suspended,
                JobPage:this.JobPage,
                Descr:this.Descr,
                Params:this.Params
              };

      this.service.updateJobFiliali(val).subscribe(res=>{alert(res.toString());
    });

    console.log("update job: ", val);

  }

  getMacroList(){
    this.service.getAllMacroFilialiList().subscribe((data:any)=>{
      this.JobMacroList = data;
    });
  }

  getAllSuspendedOpt(){
    this.service.getAllSuspendedFilialiOpt().subscribe((data:any)=>{
      this.SuspendedOpt = data;
    });
  }

  getAllFridayJobs(){
    this.service.getAllFridayFilialiJobs().subscribe((data:any)=>{
      this.FridayJobs = data;
    });
  }

  getAllFilialiPages(){
    this.service.getAllFilialiPages().subscribe((data:any)=>{
      this.FilialiPages = data;
    });
  }
}
