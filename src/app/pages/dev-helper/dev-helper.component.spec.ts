import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevHelperComponent } from './dev-helper.component';

describe('DevHelperComponent', () => {
  let component: DevHelperComponent;
  let fixture: ComponentFixture<DevHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
