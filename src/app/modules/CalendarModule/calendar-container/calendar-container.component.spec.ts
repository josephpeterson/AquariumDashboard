import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CalendarContainerComponent } from './calendar-container.component';

describe('CalendarContainerComponent', () => {
  let component: CalendarContainerComponent;
  let fixture: ComponentFixture<CalendarContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
