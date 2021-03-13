import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-add-edit-job-filiali',
  templateUrl: './add-edit-job-filiali.component.html',
  styleUrls: ['./add-edit-job-filiali.component.css']
})
export class AddEditJobFilialiComponent implements OnInit {

  constructor(private service:SharedService) {}

  pf = new FormGroup({
    inputNameFormControl : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    inputMacroFormControl : new FormControl('', [Validators.required]),
    inputLibFormControl : new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
    inputJobPageFormControl : new FormControl('', [Validators.required]),
    inputSuspendedFormControl : new FormControl('', [Validators.required]),
    inputFriday2XFormControl : new FormControl('', [Validators.required]),
    inputDescrFormControl : new FormControl(''),
    inputParamsFormControl : new FormControl('')
    });

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

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.pf.value);
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
