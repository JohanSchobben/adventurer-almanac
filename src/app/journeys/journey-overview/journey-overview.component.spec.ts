import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyOverviewComponent } from './journey-overview.component';

describe('JourneyOverviewComponent', () => {
  let component: JourneyOverviewComponent;
  let fixture: ComponentFixture<JourneyOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JourneyOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JourneyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
