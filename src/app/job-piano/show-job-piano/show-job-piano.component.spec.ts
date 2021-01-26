import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowJobPianoComponent } from './show-job-piano.component';

describe('ShowJobPianoComponent', () => {
  let component: ShowJobPianoComponent;
  let fixture: ComponentFixture<ShowJobPianoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowJobPianoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowJobPianoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
