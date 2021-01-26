import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFilialiComponent } from './job-filiali.component';

describe('JobFilialiComponent', () => {
  let component: JobFilialiComponent;
  let fixture: ComponentFixture<JobFilialiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobFilialiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobFilialiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
