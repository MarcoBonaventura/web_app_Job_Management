import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditJobFilialiComponent } from './add-edit-job-filiali.component';

describe('AddEditJobFilialiComponent', () => {
  let component: AddEditJobFilialiComponent;
  let fixture: ComponentFixture<AddEditJobFilialiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditJobFilialiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditJobFilialiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
