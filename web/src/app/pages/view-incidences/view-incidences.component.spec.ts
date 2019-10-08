import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIncidencesComponent } from './view-incidences.component';

describe('ViewIncidencesComponent', () => {
  let component: ViewIncidencesComponent;
  let fixture: ComponentFixture<ViewIncidencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIncidencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIncidencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
