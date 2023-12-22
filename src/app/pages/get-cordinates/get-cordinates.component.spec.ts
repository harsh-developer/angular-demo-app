import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCordinatesComponent } from './get-cordinates.component';

describe('GetCordinatesComponent', () => {
  let component: GetCordinatesComponent;
  let fixture: ComponentFixture<GetCordinatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetCordinatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCordinatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
