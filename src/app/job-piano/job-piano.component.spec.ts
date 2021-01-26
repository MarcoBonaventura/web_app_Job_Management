import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPianoComponent } from './job-piano.component';

describe('JobPianoComponent', () => {
  let component: JobPianoComponent;
  let fixture: ComponentFixture<JobPianoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPianoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPianoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
