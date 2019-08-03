import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatomoComponent } from './ngx-matomo.component';

describe('NgxMatomoComponent', () => {
  let component: NgxMatomoComponent;
  let fixture: ComponentFixture<NgxMatomoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMatomoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatomoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
