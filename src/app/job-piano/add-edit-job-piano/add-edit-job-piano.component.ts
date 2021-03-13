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
  selector: 'app-add-edit-job-piano',
  templateUrl: './add-edit-job-piano.component.html',
  styleUrls: ['./add-edit-job-piano.component.css'],
})
export class AddEditJobPianoComponent implements OnInit {
  
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

  
  

  @Input() jobpiano:any;

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
 
  JobsPianoList:any = [];
  JobMacroList:any = [];
  SuspendedOpt:any = [];
  FridayJobs:any = [];
  PianoPages:any = [];
 
  

  ngOnInit(): void {
    this.loadJobList();
    this.getMacroList();
    this.getAllSuspendedOpt();
    this.getAllFridayJobs();
    this.getAllPianoPages();
  }
   
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.pf.value);
  }
  
  loadJobList(){
    this.service.getAllJobsPiano().subscribe((data:any)=>{
      this.JobsPianoList = data;
      this.JobID = this.jobpiano.JobID;
      this.Prty = this.jobpiano.Prty;
      this.JobName = this.jobpiano.JobName;
      this.Macro = this.jobpiano.Macro;
      this.Lib = this.jobpiano.Lib;
      this.Suspended = this.jobpiano.Suspended;
      this.Friday2X = this.jobpiano.Friday2X;
      this.JobPage = this.jobpiano.JobPage;
      this.Descr = this.jobpiano.Descr;
      this.Params = this.jobpiano.Params;
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
              
    this.service.addJobPiano(val).subscribe(res=>{alert(res.toString());
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

      this.service.updateJobPiano(val).subscribe(res=>{alert(res.toString());
    });

    console.log("update job: ", val);

  } 

  getMacroList(){
    this.service.getAllMacroPianoList().subscribe((data:any)=>{
      this.JobMacroList = data;
      console.log("MacroList: ",this.JobMacroList);
    });
  }

  getAllSuspendedOpt(){
    this.service.getAllSuspendedPianoOpt().subscribe((data:any)=>{
      this.SuspendedOpt = data;
    });
  }

  getAllFridayJobs(){
    this.service.getAllFridayPianoJobs().subscribe((data:any)=>{
      this.FridayJobs = data;
    });
  }

  getAllPianoPages(){
    this.service.getAllPianoPages().subscribe((data:any)=>{
      this.PianoPages = data;
      console.log("PageList: ",this.PianoPages);
    });
  }


  
}
