import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FishSectionComponent } from './fish-section.component';

describe('FishSectionComponent', () => {
  let component: FishSectionComponent;
  let fixture: ComponentFixture<FishSectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FishSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
