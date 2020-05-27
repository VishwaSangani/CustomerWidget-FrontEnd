import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerSelectionComponent } from './dealer-selection.component';

describe('DealerSelectionComponent', () => {
  let component: DealerSelectionComponent;
  let fixture: ComponentFixture<DealerSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
