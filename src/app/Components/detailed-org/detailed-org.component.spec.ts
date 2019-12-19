import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedOrgComponent } from './detailed-org.component';

describe('DetailedOrgComponent', () => {
  let component: DetailedOrgComponent;
  let fixture: ComponentFixture<DetailedOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
