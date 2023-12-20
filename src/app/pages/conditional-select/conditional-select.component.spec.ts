import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalSelectComponent } from './conditional-select.component';

describe('ConditionalSelectComponent', () => {
  let component: ConditionalSelectComponent;
  let fixture: ComponentFixture<ConditionalSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionalSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionalSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
