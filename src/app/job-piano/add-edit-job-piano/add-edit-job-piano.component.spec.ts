import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditJobPianoComponent } from './add-edit-job-piano.component';

describe('AddEditJobPianoComponent', () => {
  let component: AddEditJobPianoComponent;
  let fixture: ComponentFixture<AddEditJobPianoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditJobPianoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditJobPianoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
