import { Component, OnInit, Input } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-job-italia',
  templateUrl: './add-edit-job-italia.component.html',
  styleUrls: ['./add-edit-job-italia.component.css']
})
export class AddEditJobItaliaComponent implements OnInit {

  constructor(private service:SharedService) {}

  @Input() jobitalia:any;

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
 
  JobsItaliaList:any = [];
  JobMacroList:any = [];
  SuspendedOpt:any = [];
  FridayJobs:any = [];
  ItaliaPages:any = [];
 
  ngOnInit(): void {
    this.loadJobList();
    this.getMacroList();
    this.getAllSuspendedOpt();
    this.getAllFridayJobs();
    this.getAllItaliaPages();
  }
   
  loadJobList(){
    this.service.getAllJobsPiano().subscribe((data:any)=>{
      this.JobsItaliaList = data;
      this.JobID = this.jobitalia.JobID;
      this.Prty = this.jobitalia.Prty;
      this.JobName = this.jobitalia.JobName;
      this.Macro = this.jobitalia.Macro;
      this.Lib = this.jobitalia.Lib;
      this.Suspended = this.jobitalia.Suspended;
      this.Friday2X = this.jobitalia.Friday2X;
      this.JobPage = this.jobitalia.JobPage;
      this.Descr = this.jobitalia.Descr;
      this.Params = this.jobitalia.Params;
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
              
    this.service.addJobItalia(val).subscribe(res=>{alert(res.toString());
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

      this.service.updateJobItalia(val).subscribe(res=>{alert(res.toString());
    });

    console.log("update job: ", val);

  }

  getMacroList(){
    this.service.getAllMacroItaliaList().subscribe((data:any)=>{
      this.JobMacroList = data;
    });
  }

  getAllSuspendedOpt(){
    this.service.getAllSuspendedItaliaOpt().subscribe((data:any)=>{
      this.SuspendedOpt = data;
    });
  }

  getAllFridayJobs(){
    this.service.getAllFridayItaliaJobs().subscribe((data:any)=>{
      this.FridayJobs = data;
    });
  }

  getAllItaliaPages(){
    this.service.getAllItaliaPages().subscribe((data:any)=>{
      this.ItaliaPages = data;
    });
  }

}
