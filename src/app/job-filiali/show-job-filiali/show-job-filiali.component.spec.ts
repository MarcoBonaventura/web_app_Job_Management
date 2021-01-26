import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowJobFilialiComponent } from './show-job-filiali.component';

describe('ShowJobFilialiComponent', () => {
  let component: ShowJobFilialiComponent;
  let fixture: ComponentFixture<ShowJobFilialiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowJobFilialiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowJobFilialiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
