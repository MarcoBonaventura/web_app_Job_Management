import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobItaliaComponent } from './job-italia.component';

describe('JobItaliaComponent', () => {
  let component: JobItaliaComponent;
  let fixture: ComponentFixture<JobItaliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobItaliaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobItaliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
