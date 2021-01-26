import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowJobItaliaComponent } from './show-job-italia.component';

describe('ShowJobItaliaComponent', () => {
  let component: ShowJobItaliaComponent;
  let fixture: ComponentFixture<ShowJobItaliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowJobItaliaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowJobItaliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
