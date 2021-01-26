import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditJobItaliaComponent } from './add-edit-job-italia.component';

describe('AddEditJobItaliaComponent', () => {
  let component: AddEditJobItaliaComponent;
  let fixture: ComponentFixture<AddEditJobItaliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditJobItaliaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditJobItaliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
