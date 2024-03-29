import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenceFormComponent } from './incidence-form.component';

describe('IncidenceFormComponent', () => {
  let component: IncidenceFormComponent;
  let fixture: ComponentFixture<IncidenceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidenceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
