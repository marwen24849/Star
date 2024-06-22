import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cars3Component } from './cars3.component';

describe('Cars3Component', () => {
  let component: Cars3Component;
  let fixture: ComponentFixture<Cars3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cars3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Cars3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
